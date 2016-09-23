'use strict';

var GAME_CONFIG = require('./gameConfig.js');

var setupRenderer = function () {
    var renderer = GAME_CONFIG.PIXI.autoDetectRenderer(GAME_CONFIG.constants.GAME_WIDTH, GAME_CONFIG.constants.GAME_HEIGHT, {antialias: GAME_CONFIG.constants.ANTIALIAS, transparent: GAME_CONFIG.constants.TRANSPARENT, resolution: GAME_CONFIG.constants.RESOLUTION});
    return renderer;
};

module.exports = {
    setupRenderer: function () {
        return setupRenderer();
    }
};
