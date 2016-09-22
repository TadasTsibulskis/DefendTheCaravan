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
var worldSetup = require('./world/worldSetup.js');

var viewController = function () {
    debugger;
    var $STAGE = stageSetup.setupStage(GAME_CONFIG);
    var $RENDERER = stageSetup.setupRenderer(GAME_CONFIG);
    $(GAME_CONFIG.selectors.STAGE).html($RENDERER.view);

    var $WORLD = worldSetup.init(WORLD_CONFIG);
    $STAGE.addChild($WORLD);

    $RENDERER.render($STAGE);
};

module.exports = {
    init: function () {
        viewController();
    }
};
