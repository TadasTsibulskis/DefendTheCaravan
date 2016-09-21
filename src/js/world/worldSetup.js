// TODO : break this module into multiple for loading, building, etc
'use strict';

var PIXI = require('pixi.js');
var TILE = require('./tile.js');

var loadAssets = function (WORLD_CONFIG) {
    var loadPath = WORLD_CONFIG.constants.assetLocation;
    // TODO : create function that adds assets like so assetsToLoad = ['asset1.png', 'asset2.png'];
    var assetsToLoad = [loadPath + 'grass.png'];
    var loader = new PIXI.loaders.Loader();
    // loader.once('complete', completeFunction);
    // TODO : create actual preloading
    loader.add(assetsToLoad);
    loader.load();
};

var buildWorld = function (WORLD_CONFIG, container) {
    var worldGrid = new Array(WORLD_CONFIG.constants.height);
    for (var x = 0; x < WORLD_CONFIG.constants.width; x++) {
        worldGrid[x] = new Array(WORLD_CONFIG.constants.width);
    }

    for (var i = 0; i < WORLD_CONFIG.constants.height; i++) {
        for (var j = 0; j < WORLD_CONFIG.constants.width; j++) {
            var Tile = TILE.init(WORLD_CONFIG, 0);
            // Tile.tilePosition.x = 0;
            // Tile.tilePosition.y = 0;
            worldGrid[i][j] = Tile;
        }
    }
    return container;
};

var worldSetup = function (WORLD_CONFIG) {
    loadAssets(WORLD_CONFIG);
    var WORLD = new PIXI.Container();
    WORLD = buildWorld(WORLD_CONFIG, WORLD);
    WORLD.position.set(0, 0);
    return WORLD;
};

module.exports = {
    init: function (WORLD_CONFIG) {
        return worldSetup(WORLD_CONFIG);
    }
};
