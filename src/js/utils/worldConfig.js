'use strict';

var GAME_CONFIG = require('./gameConfig.js');

var WORLD_CONFIG = {
    ASSET_LOCATION: '/src/assets/',
    TILE_WIDTH:  50,
    TILE_HEIGHT: 50,
    GAME_WIDTH: 6,
    GAME_HEIGHT: 6
};

var TILE_NAMES = {
    grass: 'grass'
};

var ASSET_LIST = [
    'grass.png'
];

module.exports = {
    constants: WORLD_CONFIG,
    tile_names: TILE_NAMES,
    ASSET_LIST: ASSET_LIST
};
