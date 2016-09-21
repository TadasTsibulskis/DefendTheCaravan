'use strict';

var PIXI = require('pixi.js');

var type;
var width;
var height;

var tile = function (type, width, height) {
    var Tile = PIXI.Sprite;
    Tile.width = width;
    Tile.height = height;
    switch (type) {
        case 0 : {
            Tile.type = 'dirt';
            Tile.fromFrame('dirt');
            break;
        }

        default : {
            break;
        }
    }
    return Tile;
};

module.exports = {
    init: function() {
        return tile();
    }
};
