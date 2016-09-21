'use strict';

var PIXI = require('pixi.js');

var stageSetup = function (GAME_CONFIG) {
    var renderer = PIXI.autoDetectRenderer(GAME_CONFIG.constants.GAME_WIDTH, GAME_CONFIG.constants.GAME_HEIGHT, {antialias: false, transparent: false, resolution: 1});
    renderer.backgroundColor = 0x99ccff;
    // renderer = new PIXI.WebGLRenderer(GAME_CONFIG.GAME_WIDTH, GAME_CONFIG.GAME_WIDTH);
    // renderer = new PIXI.CanvasRenderer(GAME_CONFIG.GAME_WIDTH, GAME_CONFIG.GAME_WIDTH);
    $(GAME_CONFIG.selectors.STAGE).html(renderer.view);
    var stage = new PIXI.Container();
    var ground = new PIXI.Graphics();
    stage.addChild(ground);
    renderer.render(stage);
    return stage;
};

module.exports = {
    init: function (GAME_CONFIG) {
        return stageSetup(GAME_CONFIG);
    }
};
