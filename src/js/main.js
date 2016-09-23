'use strict';

var viewController = require('./controllers/viewController');
var gameController = require('./controllers/gameController');

var setupCanvas = function () {
    return viewController.setupCanvas();
};

var setupStage = function () {
    return viewController.setupStage();
};

var setupGame = function () {
    return gameController.init();
};

var main = function () {
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        // $STAGE.children[0].y -= 1;
        $CANVAS.render($STAGE);
    }

    var $CANVAS = setupCanvas();
    var $STAGE = setupStage();
    $DTC.children = $STAGE.children;
    var $GAME_CONTROLLER = setupGame();

    /* DEBUGGING */
    console.log('CANVAS', $CANVAS);
    console.log('STAGE', $STAGE);
    console.log('GAME CONTROLLER', $GAME_CONTROLLER);
    /*           */

    gameLoop();
};

module.exports = {
    init: function () {
        main();
    }
};