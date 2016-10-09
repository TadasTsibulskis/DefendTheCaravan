'use strict';

var GAME_CONFIG = require('./gameConfig.js');

var canvasSetup = function () {
    var canvas = GAME_CONFIG.PIXI.autoDetectRenderer(GAME_CONFIG.constants.GAME_WIDTH, GAME_CONFIG.constants.GAME_HEIGHT, GAME_CONFIG.constants.RENDER_OPTIONS);
    canvas.roundPixels = true;
    return canvas;
};

module.exports = {
    init: function () {
        return canvasSetup();
    }
};
