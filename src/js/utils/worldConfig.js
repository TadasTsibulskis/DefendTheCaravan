'use strict';

var WORLD_CONFIG = {
    assetLocation: '/src/assets/',
    width: 50,
    height: 50,
    tileWidth: 10,
    tileHeight: 10
};

var TILE_NAMES = {
    grass: 'grass.png'
};

module.exports = {
    constants: WORLD_CONFIG,
    tile_names: TILE_NAMES
};
