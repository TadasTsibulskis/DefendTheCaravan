'use strict';

var GAME_CONFIG = require('./gameConfig.js');
var WORLD_CONFIG = require('./worldConfig.js');

var uiSetup = function () {
    var $UI = new GAME_CONFIG.PIXI.Graphics();
    $UI.beginFill(0xBB22AE);
    $UI.drawRect(0, 0, GAME_CONFIG.constants.UI_WIDTH, GAME_CONFIG.constants.UI_HEIGHT);
    $UI.endFill();
    $UI.x = (GAME_CONFIG.constants.GAME_WIDTH / 2) - ($UI.width / 2);
    $UI.y = GAME_CONFIG.constants.GAME_HEIGHT - $UI.height;
    return $UI;
};

module.exports = {
    init: function () {
        return uiSetup();
    }
};
