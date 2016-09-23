'use strict';

var GAME_CONFIG = require('./gameConfig.js');
var WORLD_CONFIG = require('./worldConfig.js');
var TILE = require('../world/tile.js');

var buildWorld = function ($ASSETS, container) {
    var worldGrid = new Array(WORLD_CONFIG.constants.GAME_HEIGHT);
    for (var x = 0; x < WORLD_CONFIG.constants.GAME_WIDTH; x++) {
        worldGrid[x] = new Array(WORLD_CONFIG.constants.GAME_WIDTH);
    }

    for (var i = 0; i < WORLD_CONFIG.constants.GAME_HEIGHT; i++) {
        for (var j = 0; j < WORLD_CONFIG.constants.GAME_WIDTH; j++) {
            var Tile = TILE.init($ASSETS, 0);
            Tile.x = Math.floor(j * WORLD_CONFIG.constants.TILE_WIDTH);
            Tile.y = Math.floor(i * WORLD_CONFIG.constants.TILE_HEIGHT);
            worldGrid[i][j] = Tile;
            container.addChild(Tile);
        }
    }
    return container;
};

var worldSetup = function ($ASSETS) {
    var WORLD = new GAME_CONFIG.PIXI.Container();
    $DTC.world = WORLD;
    WORLD = buildWorld($ASSETS, WORLD);
    return WORLD;
};

module.exports = {
    init: function ($ASSETS) {
        return worldSetup($ASSETS);
    }
};

// TODO : Use dynamic container + pixi container