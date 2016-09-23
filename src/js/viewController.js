/***************************************/
/* viewController.js
/* This class controls the stage and all objects being passed to the stage. Animations and game functions are handled elsewhere.
/***************************************/

'use strict';

// Load configs
var GAME_CONFIG = require('./utils/gameConfig.js');
var WORLD_CONFIG = require('./utils/worldConfig.js');

// Stage stuff
var renderSetup = require('./utils/renderSetup.js');
var assetLoader = require('./utils/assetLoader.js');
var worldSetup = require('./world/worldSetup.js');

var viewController = function () {
    function loadComplete () {
        var $WORLD = worldSetup.init($LOADER.resources);
        setupStage($WORLD);
    }

    function setupStage ($WORLD) {
        $STAGE.addChild($WORLD);
        $(GAME_CONFIG.selectors.STAGE).html($RENDERER.view);
        $RENDERER.render($STAGE);
    }

    var $STAGE = new GAME_CONFIG.PIXI.Container();
    var $RENDERER = renderSetup.setupRenderer();
    var $LOADER = assetLoader.loadAssets(loadComplete);
};

module.exports = {
    init: function () {
        viewController();
    }
};
