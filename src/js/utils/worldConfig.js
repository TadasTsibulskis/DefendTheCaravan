'use strict';

var GAME_CONFIG = require('./gameConfig.js');

var WORLD_CONFIG = {
    ASSET_LOCATION: '/src/assets/',
    TILE_WIDTH:  50,
    TILE_HEIGHT: 50,
    GAME_WIDTH: 22,
    GAME_HEIGHT: 22
};

var TILE_NAMES = {
    grass: 'grass-01',
    path: 'path-01',
    path_left: 'path-01left',
    path_right: 'path-01right'
};

var CARTS_ALL = {
    cart_01: 'cart.png'
};

var ASSET_LIST = [
    'grass-01.png',
    'path-01.png',
    'path-01left.png',
    'path-01right.png',
    'cart.png'
];

module.exports = {
    constants: WORLD_CONFIG,
    tile_names: TILE_NAMES,
    carts_all: CARTS_ALL,
    ASSET_LIST: ASSET_LIST
};
