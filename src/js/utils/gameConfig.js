'use strict';

var PIXI = require('pixi.js');
PIXI.utils._saidHello = true;

var GAME_CONFIG = {
    GAME_WIDTH: 900,
    GAME_HEIGHT: 506,
    GUI_WIDTH: 900,
    GUI_HEIGHT: 80,
    ANTIALIAS: false,
    TRANSPARENT: false,
    RESOLUTION: 1
};

var SELECTORS = {
    STAGE: '#stage'
};

module.exports = {
    PIXI: PIXI,
    constants: GAME_CONFIG,
    selectors: SELECTORS
};
