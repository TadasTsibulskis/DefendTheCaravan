'use strict';

var PIXI = require('pixi.js');
// Removes console log
PIXI.utils.skipHello();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var GAME_CONFIG = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 450,
    UI_WIDTH: 1334,
    UI_HEIGHT: 80,
    RENDER_OPTIONS: {
        antialias: true,
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
