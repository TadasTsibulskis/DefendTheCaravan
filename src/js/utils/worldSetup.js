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
            var tileType = 'grass';
            if (j === 10) {
                tileType = 'path_left';
            }
            if (j === 11) {
                tileType = 'path';
            }
            if (j === 12) {
                tileType = 'path_right';
            }
            var Tile = TILE.init($ASSETS, tileType);
            Tile.x = Math.floor(j * WORLD_CONFIG.constants.TILE_WIDTH);
            Tile.y = Math.floor(i * WORLD_CONFIG.constants.TILE_HEIGHT);
            worldGrid[i][j] = Tile;
            container.addChild(Tile);
        }
    }
    $DTC.worldGrid = container;
    return container;
};

var centerWorld = function (WORLD) {
    WORLD.x = (GAME_CONFIG.constants.GAME_WIDTH / 2) - (WORLD.width / 2);
    WORLD.y = (GAME_CONFIG.constants.GAME_HEIGHT - WORLD.height - GAME_CONFIG.constants.UI_HEIGHT / 2);
    return WORLD;
};

var worldSetup = function ($ASSETS) {
    var WORLD = new GAME_CONFIG.PIXI.Container();
    WORLD = buildWorld($ASSETS, WORLD);
    WORLD = centerWorld(WORLD);
    return WORLD;
};

module.exports = {
    init: function ($ASSETS) {
        return worldSetup($ASSETS);
    }
};

// TODO : Use dynamic container + pixi container to determine which tiles get added to WORLD and thus rendered