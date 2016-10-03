'use strict';

var gameController = function ($VIEW_CONTROLLER) {
    // return object that contains functions that can be accessed 1 level up scope
};

gameController.prototype.run = function () {
    console.log('running');  
};

module.exports = {
    gameLoop: function () {
        return new gameController();
    }
};
