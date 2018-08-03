'use strict';

var GAME_CONFIG = require('../utils/gameConfig.js');

var InputController = function () {
    function keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        key.downHandler = function (event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) {
                    key.press();
                }
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        key.upHandler = function (event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) {
                    key.release();
                }
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        window.addEventListener('keydown', key.downHandler.bind(key), false);
        window.addEventListener('keyup', key.upHandler.bind(key), false);
        return key;
    }

    var left = keyboard(37);
    var up = keyboard(38);
    var right = keyboard(39);
    var down = keyboard(40);

    left.press = function () {
        console.log('Left Key pressed');
    };

    left.release = function () {
        console.log('Left Key released');
    };

    up.press = function () {
        console.log('Up Key pressed');
    };

    up.release = function () {
        console.log('Up Key released');
    };

    right.press = function () {
        console.log('Right Key pressed');
    };

    right.release = function () {
        console.log('Right Key released');
    };

    down.press = function () {
        console.log('Down Key pressed');
    };

    down.release = function () {
        console.log('Down Key released');
    };
};

module.exports = {
    init: function () {
        return new InputController();
    }
};
