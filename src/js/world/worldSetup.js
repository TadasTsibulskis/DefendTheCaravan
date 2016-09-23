// TODO : break this module into multiple for loading, building, etc
'use strict';

var GAME_CONFIG = require('../utils/gameConfig.js');
var WORLD_CONFIG = require('../utils/worldConfig.js');
var TILE = require('./tile.js');

var buildWorld = function ($ASSETS, container) {
    var worldGrid = new Array(WORLD_CONFIG.constants.height);
    for (var x = 0; x < WORLD_CONFIG.constants.width; x++) {
        worldGrid[x] = new Array(WORLD_CONFIG.constants.width);
    }

    for (var i = 0; i < WORLD_CONFIG.constants.height; i++) {
        for (var j = 0; j < WORLD_CONFIG.constants.width; j++) {
            var Tile = TILE.init($ASSETS, 0);
            worldGrid[i][j] = Tile;
            container.addChild(Tile);
        }
    }
    return container;
};

var worldSetup = function ($ASSETS) {
    var WORLD = new GAME_CONFIG.PIXI.Container();
    WORLD = buildWorld($ASSETS, WORLD);
    return WORLD;
};

module.exports = {
    init: function ($ASSETS) {
        return worldSetup($ASSETS);
    }
};
