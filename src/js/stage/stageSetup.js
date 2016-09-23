'use strict';

var PIXI = require('pixi.js');

var setupRenderer = function (GAME_CONFIG) {
    var renderer = PIXI.autoDetectRenderer(GAME_CONFIG.constants.GAME_WIDTH, GAME_CONFIG.constants.GAME_HEIGHT, {antialias: false, transparent: false, resolution: 1});
    renderer.backgroundColor = 0x99ccff;
    // renderer = new PIXI.WebGLRenderer(GAME_CONFIG.GAME_WIDTH, GAME_CONFIG.GAME_WIDTH);
    // renderer = new PIXI.CanvasRenderer(GAME_CONFIG.GAME_WIDTH, GAME_CONFIG.GAME_WIDTH);
    return renderer;
};

var setupStage = function (GAME_CONFIG) {
    var stage = new PIXI.Container();
    return stage;
};

module.exports = {
    setupRenderer: function (GAME_CONFIG) {
        return setupRenderer(GAME_CONFIG);
    },
    setupStage: function (GAME_CONFIG) {
        return setupStage(GAME_CONFIG);
    }
};
