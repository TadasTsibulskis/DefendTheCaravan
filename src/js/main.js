'use strict';

var viewController = require('./controllers/viewController');
var gameController = require('./controllers/gameController');
// var mainHero = require('./hero/hero');

var setupCanvas = function () {
    return viewController.setupCanvas();
};

var setupStage = function () {
    return viewController.setupStage();
};

var setupEngine = function () {
    return gameController.gameLoop();
};

var main = function () {
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        // $STAGE.children[0].y -= 1;
        var $GAME_CONTROLLER = setupEngine();
        $GAME_CONTROLLER.run();
        $CANVAS.render($STAGE);
    }

    var $CANVAS = setupCanvas();
    var $STAGE = setupStage();
    $DTC.stage = $STAGE;
    // var $HERO = setupHero();

    /* DEBUGGING */
    console.log('CANVAS', $CANVAS);
    console.log('STAGE', $STAGE);
    // console.log('GAME CONTROLLER', $GAME_CONTROLLER);
    /*           */

    gameLoop();
};

module.exports = {
    init: function () {
        main();
    }
};