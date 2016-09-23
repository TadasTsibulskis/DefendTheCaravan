/***************************************/
/* viewController.js
/* This class controls the stage and all objects being passed to the stage. Animations and game functions are handled elsewhere.
/***************************************/

'use strict';

// Load configs
var GAME_CONFIG = require('../utils/gameConfig.js');
var WORLD_CONFIG = require('../utils/worldConfig.js');

// Stage stuff
var canvasSetup = require('../utils/canvasSetup.js');
var assetLoader = require('../utils/assetLoader.js');
var worldSetup = require('../utils/worldSetup.js');

var viewController = function () {};

var setupCanvas = function() {
    var $CANVAS = canvasSetup.init();
    $(GAME_CONFIG.selectors.STAGE).html($CANVAS.view);
    return $CANVAS;
};

var setupStage = function () {
    function loadComplete () {
        var $WORLD = worldSetup.init($LOADER.resources);
        $STAGE.addChild($WORLD);
    }

    var $LOADER = assetLoader.loadAssets(loadComplete);
    var $STAGE = new GAME_CONFIG.PIXI.Container();

    return $STAGE;
};

module.exports = {
    setupCanvas: function () {
        return setupCanvas();
    },
    setupStage: function () {
        return setupStage();
    }
};
