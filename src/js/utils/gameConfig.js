'use strict';

var PIXI = require('pixi.js');
// Removes console log
PIXI.utils._saidHello = true;

var GAME_CONFIG = {
    GAME_WIDTH: 1334,
    GAME_HEIGHT: 750,
    UI_WIDTH: 1334,
    UI_HEIGHT: 80,
    RENDER_OPTIONS: {
        antialias: false, 
        transparent: false, 
        resolution: 1
    },
};

var SELECTORS = {
    STAGE: '#stage'
};

module.exports = {
    PIXI: PIXI,
    constants: GAME_CONFIG,
    selectors: SELECTORS
};
