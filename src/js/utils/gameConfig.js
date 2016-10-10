'use strict';

var PIXI = require('pixi.js');
PIXI.utils._saidHello = true;

var GAME_CONFIG = {
    GAME_WIDTH: 900,
    GAME_HEIGHT: 506,
    UI_WIDTH: 900,
    UI_HEIGHT: 80,
    RENDER_OPTIONS: {
        antialias: false,
        transparent: false,
        resolution: 1
    }
};

var SELECTORS = {
    STAGE: '#stage'
};

module.exports = {
    PIXI: PIXI,
    constants: GAME_CONFIG,
    selectors: SELECTORS
};
