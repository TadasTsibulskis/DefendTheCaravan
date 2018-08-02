'use strict';

var GAME_CONFIG = require('./gameConfig.js');
var WORLD_CONFIG = require('./worldConfig.js');

var buildAssetArray = function (WORLD_CONFIG) {
    var arr = [];
    for (var i = 0; i < WORLD_CONFIG.ASSET_LIST.length; i++) {
        arr[i] = WORLD_CONFIG.constants.ASSET_LOCATION + WORLD_CONFIG.ASSET_LIST[i];
    }
    return arr;
};

var loadingInProgress = function (loader, resource) {
    console.log('loading resource: ' + resource.url);
    console.log('progress: ' + loader.progress + '%');
};

var assetLoader = function (callback) {
    var assetsToLoad = buildAssetArray(WORLD_CONFIG);
    var loader = new GAME_CONFIG.PIXI.loaders.Loader();

    loader.add(assetsToLoad);
    loader.on('progress', loadingInProgress);
    loader.load(callback);
    return loader;
};

module.exports = {
    loadAssets: function (callback) {
        return assetLoader(callback);
    }
};
