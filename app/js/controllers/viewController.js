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
var uiSetup = require('../utils/uiSetup.js');
var mainHero = require('../hero/mainHero.js');

var viewController = function () {};

var setupCanvas = function() {
    var $CANVAS = canvasSetup.init();
    $(GAME_CONFIG.selectors.STAGE).html($CANVAS.view);
    return $CANVAS;
};

var setupStage = function () {
    function loadComplete () {
        var $WORLD = worldSetup.init(worldLoader.resources);
        var $UI = uiSetup.init();
        var $HERO = mainHero.init(worldLoader.resources);

        /* DEBUG */
        $DTC.hero = $HERO;

        $STAGE.addChild($WORLD);
        $STAGE.addChild($UI);
        $STAGE.addChild($HERO);
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
