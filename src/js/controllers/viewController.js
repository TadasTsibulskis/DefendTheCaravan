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
var guiSetup = require('../utils/guiSetup.js');

var viewController = function () {};

var setupCanvas = function() {
    var $CANVAS = canvasSetup.init();
    $(GAME_CONFIG.selectors.STAGE).html($CANVAS.view);
    return $CANVAS;
};

var setupStage = function () {
    function loadComplete () {
        var $WORLD = worldSetup.init(worldLoader.resources);
        var $GUI = guiSetup.init();
        $STAGE.addChild($WORLD);
        $STAGE.addChild($GUI);
    }

    var worldLoader = assetLoader.loadAssets(loadComplete);
    var $STAGE = new GAME_CONFIG.PIXI.Container();

    return $STAGE;
};

var setupUi = function () {
};

var setupHero = function () {  
};

module.exports = {
    setupCanvas: function () {
        return setupCanvas();
    },
    setupStage: function () {
        return setupStage();
    },
    setupUi: function () {
        return setupUi();
    },
    setupHero: function () {
        return setupHero();
    }
};
