'use strict';
var Base = require('../node_modules/mocha/lib/reporters/base');
var color = Base.color;

function printWindowLogs() {
    if (global.log().length) {
        var stack = [];
        global.log().forEach(function(log, i) {
            try {
                log = color('error title', (i + 1) + '. ' + JSON.stringify(log));
            } catch (e) {
                log = color('fail', (i + 1) + '. ' + e.message);
            }
            stack.push('    ' + log);
        });

        console.log(
            color('green', '  Console Logs:\n'),
            stack.join('\n ')
        );

        console.log();
        console.log();
    }
}

function sameType(a, b) {
    a = Object.prototype.toString.call(a);
    b = Object.prototype.toString.call(b);
    return a == b;
}
function stringify(obj) {
    if (obj instanceof RegExp) return obj.toString();
    return JSON.stringify(obj, null, 2);
}
function escapeInvisibles(line) {
    return line.replace(/\t/g, '<tab>')
    .replace(/\r/g, '<CR>')
    .replace(/\n/g, '<LF>\n');
}
function colorLines(name, str) {
    return str.split('\n').map(function(str){
        return color(name, str);
    }).join('\n');
}
function errorDiff(err, type, escape) {
    var actual   = escape ? escapeInvisibles(err.actual)   : err.actual;
    var expected = escape ? escapeInvisibles(err.expected) : err.expected;
    return diff['diff' + type](actual, expected).map(function(str){
        if (str.added) return colorLines('diff added', str.value);
        if (str.removed) return colorLines('diff removed', str.value);
        return str.value;
    }).join('');
}
function inlineDiff(err, escape) {
    var msg = errorDiff(err, 'WordsWithSpace', escape);

    // linenos
    var lines = msg.split('\n');
    if (lines.length > 4) {
        var width = String(lines.length).length;
        msg = lines.map(function(str, i){
            return pad(++i, width) + ' |' + ' ' + str;
        }).join('\n');
    }

    // legend
    msg = '\n'
    + color('diff removed', 'actual')
    + ' '
    + color('diff added', 'expected')
    + '\n\n'
    + msg
    + '\n';

    // indent
    msg = msg.replace(/^/gm, '      ');
    return msg;
}
function canonicalize(obj, stack) {
    stack = stack || [];

    if (stack.indexOf(obj) !== -1) return obj;

    var canonicalizedObj;

    if ('[object Array]' == {}.toString.call(obj)) {
        stack.push(obj);
        canonicalizedObj = obj.map(function(item) {
            return canonicalize(item, stack);
        });
        stack.pop();
    } else if (typeof obj === 'object' && obj !== null) {
        stack.push(obj);
        canonicalizedObj = {};
        Object.keys(obj).sort().forEach(function(key) {
            canonicalizedObj[key] = canonicalize(obj[key], stack);
        });
        stack.pop();
    } else {
        canonicalizedObj = obj;
    }

    return canonicalizedObj;
}
function unifiedDiff(err, escape) {
    var indent = '      ';
    function cleanUp(line) {
        if (escape) {
            line = escapeInvisibles(line);
        }
        if (line[0] === '+') return indent + colorLines('diff added', line);
        if (line[0] === '-') return indent + colorLines('diff removed', line);
        if (line.match(/\@\@/)) return null;
        if (line.match(/\\ No newline/)) return null;
        else return indent + line;
    }
    function notBlank(line) {
        return line != null;
    }
    var msg = diff.createPatch('string', err.actual, err.expected);
    var lines = msg.split('\n').splice(4);
    return '\n      '
    + colorLines('diff added',   '+ expected') + ' '
    + colorLines('diff removed', '- actual')
    + '\n\n'
    + lines.map(cleanUp).filter(notBlank).join('\n');
}
var JsDiff = (function() {
    /*jshint maxparams: 5*/
    function clonePath(path) {
        return { newPos: path.newPos, components: path.components.slice(0) };
    }
    function removeEmpty(array) {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                ret.push(array[i]);
            }
        }
        return ret;
    }
    function escapeHTML(s) {
        var n = s;
        n = n.replace(/&/g, '&amp;');
        n = n.replace(/</g, '&lt;');
        n = n.replace(/>/g, '&gt;');
        n = n.replace(/"/g, '&quot;');

        return n;
    }

    var Diff = function(ignoreWhitespace) {
        this.ignoreWhitespace = ignoreWhitespace;
    };
    Diff.prototype = {
        diff: function(oldString, newString) {
            // Handle the identity case (this is due to unrolling editLength == 0
            if (newString === oldString) {
                return [{ value: newString }];
            }
            if (!newString) {
                return [{ value: oldString, removed: true }];
            }
            if (!oldString) {
                return [{ value: newString, added: true }];
            }

            newString = this.tokenize(newString);
            oldString = this.tokenize(oldString);

            var newLen = newString.length, oldLen = oldString.length;
            var maxEditLength = newLen + oldLen;
            var bestPath = [{ newPos: -1, components: [] }];

            // Seed editLength = 0
            var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
            if (bestPath[0].newPos+1 >= newLen && oldPos+1 >= oldLen) {
                return bestPath[0].components;
            }

            for (var editLength = 1; editLength <= maxEditLength; editLength++) {
                for (var diagonalPath = -1*editLength; diagonalPath <= editLength; diagonalPath+=2) {
                    var basePath;
                    var addPath = bestPath[diagonalPath-1],
                    removePath = bestPath[diagonalPath+1];
                    oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                    if (addPath) {
                        // No one else is going to attempt to use this value, clear it
                        bestPath[diagonalPath-1] = undefined;
                    }

                    var canAdd = addPath && addPath.newPos+1 < newLen;
                    var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
                    if (!canAdd && !canRemove) {
                        bestPath[diagonalPath] = undefined;
                        continue;
                    }

                    // Select the diagonal that we want to branch from. We select the prior
                    // path whose position in the new string is the farthest from the origin
                    // and does not pass the bounds of the diff graph
                    if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
                        basePath = clonePath(removePath);
                        this.pushComponent(basePath.components, oldString[oldPos], undefined, true);
                    } else {
                        basePath = clonePath(addPath);
                        basePath.newPos++;
                        this.pushComponent(basePath.components, newString[basePath.newPos], true, undefined);
                    }

                    var oldPos = this.extractCommon(basePath, newString, oldString, diagonalPath);

                    if (basePath.newPos+1 >= newLen && oldPos+1 >= oldLen) {
                        return basePath.components;
                    } else {
                        bestPath[diagonalPath] = basePath;
                    }
                }
            }
        },

        pushComponent: function(components, value, added, removed) {
            var last = components[components.length-1];
            if (last && last.added === added && last.removed === removed) {
                // We need to clone here as the component clone operation is just
                // as shallow array clone
                components[components.length-1] =
                    {value: this.join(last.value, value), added: added, removed: removed };
            } else {
                components.push({value: value, added: added, removed: removed });
            }
        },
        extractCommon: function(basePath, newString, oldString, diagonalPath) {
            var newLen = newString.length,
            oldLen = oldString.length,
            newPos = basePath.newPos,
            oldPos = newPos - diagonalPath;
            while (newPos+1 < newLen && oldPos+1 < oldLen && this.equals(newString[newPos+1], oldString[oldPos+1])) {
                newPos++;
                oldPos++;

                this.pushComponent(basePath.components, newString[newPos], undefined, undefined);
            }
            basePath.newPos = newPos;
            return oldPos;
        },

        equals: function(left, right) {
            var reWhitespace = /\S/;
            if (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right)) {
                return true;
            } else {
                return left === right;
            }
        },
        join: function(left, right) {
            return left + right;
        },
        tokenize: function(value) {
            return value;
        }
    };

    var CharDiff = new Diff();

    var WordDiff = new Diff(true);
    var WordWithSpaceDiff = new Diff();
    WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
        return removeEmpty(value.split(/(\s+|\b)/));
    };

    var CssDiff = new Diff(true);
    CssDiff.tokenize = function(value) {
        return removeEmpty(value.split(/([{}:;,]|\s+)/));
    };

    var LineDiff = new Diff();
    LineDiff.tokenize = function(value) {
        return value.split(/^/m);
    };

    return {
        Diff: Diff,

        diffChars: function(oldStr, newStr) { return CharDiff.diff(oldStr, newStr); },
        diffWords: function(oldStr, newStr) { return WordDiff.diff(oldStr, newStr); },
        diffWordsWithSpace: function(oldStr, newStr) { return WordWithSpaceDiff.diff(oldStr, newStr); },
        diffLines: function(oldStr, newStr) { return LineDiff.diff(oldStr, newStr); },

        diffCss: function(oldStr, newStr) { return CssDiff.diff(oldStr, newStr); },

        createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
            var ret = [];

            ret.push('Index: ' + fileName);
            ret.push('===================================================================');
            ret.push('--- ' + fileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
            ret.push('+++ ' + fileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));

            var diff = LineDiff.diff(oldStr, newStr);
            if (!diff[diff.length-1].value) {
                diff.pop();   // Remove trailing newline add
            }
            diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier

            function contextLines(lines) {
                return lines.map(function(entry) { return ' ' + entry; });
            }
            function eofNL(curRange, i, current) {
                var last = diff[diff.length-2],
                isLast = i === diff.length-2,
                isLastOfType = i === diff.length-3 && (current.added !== last.added || current.removed !== last.removed);

                // Figure out if this is the last line for the given file and missing NL
                if (!/\n$/.test(current.value) && (isLast || isLastOfType)) {
                    curRange.push('\\ No newline at end of file');
                }
            }

            var oldRangeStart = 0, newRangeStart = 0, curRange = [],
            oldLine = 1, newLine = 1;
            for (var i = 0; i < diff.length; i++) {
                var current = diff[i],
                lines = current.lines || current.value.replace(/\n$/, '').split('\n');
                current.lines = lines;

                if (current.added || current.removed) {
                    if (!oldRangeStart) {
                        var prev = diff[i-1];
                        oldRangeStart = oldLine;
                        newRangeStart = newLine;

                        if (prev) {
                            curRange = contextLines(prev.lines.slice(-4));
                            oldRangeStart -= curRange.length;
                            newRangeStart -= curRange.length;
                        }
                    }
                    curRange.push.apply(curRange, lines.map(function(entry) { return (current.added?'+':'-') + entry; }));
                    eofNL(curRange, i, current);

                    if (current.added) {
                        newLine += lines.length;
                    } else {
                        oldLine += lines.length;
                    }
                } else {
                    if (oldRangeStart) {
                        // Close out any changes that have been output (or join overlapping)
                        if (lines.length <= 8 && i < diff.length-2) {
                            // Overlapping
                            curRange.push.apply(curRange, contextLines(lines));
                        } else {
                            // end the range and output
                            var contextSize = Math.min(lines.length, 4);
                            ret.push(
                                '@@ -' + oldRangeStart + ',' + (oldLine-oldRangeStart+contextSize)
                                + ' +' + newRangeStart + ',' + (newLine-newRangeStart+contextSize)
                                + ' @@');
                                ret.push.apply(ret, curRange);
                                ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
                                if (lines.length <= 4) {
                                    eofNL(ret, i, current);
                                }

                                oldRangeStart = 0;  newRangeStart = 0; curRange = [];
                        }
                    }
                    oldLine += lines.length;
                    newLine += lines.length;
                }
            }

            return ret.join('\n') + '\n';
        },

        applyPatch: function(oldStr, uniDiff) {
            var diffstr = uniDiff.split('\n');
            var diff = [];
            var remEOFNL = false,
            addEOFNL = false;

            for (var i = (diffstr[0][0]==='I'?4:0); i < diffstr.length; i++) {
                if(diffstr[i][0] === '@') {
                    var meh = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
                    diff.unshift({
                        start:meh[3],
                        oldlength:meh[2],
                        oldlines:[],
                        newlength:meh[4],
                        newlines:[]
                    });
                } else if(diffstr[i][0] === '+') {
                    diff[0].newlines.push(diffstr[i].substr(1));
                } else if(diffstr[i][0] === '-') {
                    diff[0].oldlines.push(diffstr[i].substr(1));
                } else if(diffstr[i][0] === ' ') {
                    diff[0].newlines.push(diffstr[i].substr(1));
                    diff[0].oldlines.push(diffstr[i].substr(1));
                } else if(diffstr[i][0] === '\\') {
                    if (diffstr[i-1][0] === '+') {
                        remEOFNL = true;
                    } else if(diffstr[i-1][0] === '-') {
                        addEOFNL = true;
                    }
                }
            }

            var str = oldStr.split('\n');
            for (var i = diff.length - 1; i >= 0; i--) {
                var d = diff[i];
                for (var j = 0; j < d.oldlength; j++) {
                    if(str[d.start-1+j] !== d.oldlines[j]) {
                        return false;
                    }
                }
                Array.prototype.splice.apply(str,[d.start-1,+d.oldlength].concat(d.newlines));
            }

            if (remEOFNL) {
                while (!str[str.length-1]) {
                    str.pop();
                }
            } else if (addEOFNL) {
                str.push('');
            }
            return str.join('\n');
        },

        convertChangesToXML: function(changes){
            var ret = [];
            for ( var i = 0; i < changes.length; i++) {
                var change = changes[i];
                if (change.added) {
                    ret.push('<ins>');
                } else if (change.removed) {
                    ret.push('<del>');
                }

                ret.push(escapeHTML(change.value));

                if (change.added) {
                    ret.push('</ins>');
                } else if (change.removed) {
                    ret.push('</del>');
                }
            }
            return ret.join('');
        },

        // See: http://code.google.com/p/google-diff-match-patch/wiki/API
        convertChangesToDMP: function(changes){
            var ret = [], change;
            for ( var i = 0; i < changes.length; i++) {
                change = changes[i];
                ret.push([(change.added ? 1 : change.removed ? -1 : 0), change.value]);
            }
            return ret;
        }
    };
})();
var diff = JsDiff;

Base.list = function(failures){
    console.error();
    failures.forEach(function(test, i){
        // format
        var fmt = color('error title', '  %s) %s:\n')
        + color('error message', '     %s')
        + color('error stack', '\n%s\n');

        // msg
        var err = test.err
            , message = err.message || ''
            , stack = err.stack || message
            , index = stack.indexOf(message) + message.length
            , msg = stack.slice(0, index)
            , actual = err.actual
            , expected = err.expected
            , escape = true;

        // uncaught
        if (err.uncaught) {
            msg = 'Uncaught ' + msg;
        }

        // explicitly show diff
        if (err.showDiff && sameType(actual, expected)) {
            escape = false;
            err.actual = actual = stringify(canonicalize(actual));
            err.expected = expected = stringify(canonicalize(expected));
        }

        // actual / expected diff
        if ('string' == typeof actual && 'string' == typeof expected) {
            fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
            var match = message.match(/^([^:]+): expected/);
            msg = '\n      ' + color('error message', match ? match[1] : msg);

            if (exports.inlineDiffs) {
                msg += inlineDiff(err, escape);
            } else {
                msg += unifiedDiff(err, escape);
            }
        }

        // indent stack trace without msg
        stack = stack.slice(index ? index + 1 : index)
        .replace(/^/gm, '  ');

        console.error(fmt, (failures.length - (i)), test.fullTitle(), msg, stack);
    });
};

/**
 * Expose `Dot2`.
 */

exports = module.exports = Dot2;

/**
 * Initialize a new `Dot2` matrix test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Dot2(runner) {
    Base.call(this, runner);

    var self = this
        , stats = this.stats
        , width = Base.window.width * .75 | 0
        , n = -1;

    runner.on('pending', function(test){
        if (++n % width == 0) process.stdout.write('\n  ');
        process.stdout.write(color('pending', Base.symbols.dot));
    });

    runner.on('pass', function(test){
        if (++n % width == 0) process.stdout.write('\n  ');
        if ('slow' == test.speed) {
            process.stdout.write(color('bright yellow', Base.symbols.dot));
        } else {
            process.stdout.write(color(test.speed, Base.symbols.dot));
        }
    });

    runner.on('fail', function(test, err){
        if (++n % width == 0) process.stdout.write('\n  ');
        process.stdout.write(color('fail', Base.symbols.dot));
    });

    runner.on('end', function(){
        self.failures.reverse();
        self.failures.forEach(function(test, i){
            var err = test.err;
            var stack = err.stack || err.message;
            // filter the stack trace
            var lines = [];
            stack.split(/\n/).forEach(function(line){
                if (!line.match("/bower_components/")) {
                    line = line.replace(/\?cb\=[\d\.]+/, '');
                    if (line.indexOf('assets') >= 0) {
                        line = '   ' + line.substr(
                            line.indexOf('assets') + 6,
                            line.length - 1
                        );
                    }
                    lines.push(line);
                }
            });
            stack = lines.join('\n');
            test.err = {
                message: err.message,
                stack: stack,
                actual: err.actual,
                expected: err.expected,
                uncaught: err.uncaught,
                sourceURL: err.sourceURL,
                showDiff: err.showDiff,
                toString: err.toString,
                line: err.line
            };
        });

        console.log();
        Base.prototype.epilogue.call(self);
        printWindowLogs();
    });
}
