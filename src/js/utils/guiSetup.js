'use strict';

var GAME_CONFIG = require('./gameConfig.js');
var WORLD_CONFIG = require('./worldConfig.js');

var guiSetup = function () {
    var $GUI = new GAME_CONFIG.PIXI.Graphics();
    $GUI.beginFill(0xBB22AE);
    $GUI.drawRect(0, 0, GAME_CONFIG.constants.GUI_WIDTH, GAME_CONFIG.constants.GUI_HEIGHT);
    $GUI.endFill();
    $GUI.x = 0;
    $GUI.y = GAME_CONFIG.constants.GAME_HEIGHT - $GUI.height;
    return $GUI;
};

module.exports = {
    init: function () {
        return guiSetup();
    }
};
