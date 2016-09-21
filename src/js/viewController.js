/***************************************/
/* viewController.js
/* This class controls the stage and all objects being passed to the stage. Animations and game functions are handled elsewhere.
/***************************************/

'use strict';

// Load configs
var GAME_CONFIG = require('./utils/gameConfig.js');
var WORLD_CONFIG = require('./utils/worldConfig.js');

// Stage stuff
var stageSetup = require('./stage/stageSetup.js');

var viewController = function () {
    var $STAGE = stageSetup.init(GAME_CONFIG);
    var $WORLD = worldSetup.init(WORLD_CONFIG)
};

module.exports = {
    init: function () {
        viewController();
    }
};
