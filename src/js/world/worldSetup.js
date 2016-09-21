'use strict';

var PIXI = require('pixi.js');
var Tile = require('./tile.js');

worldSetup.prototype.buildWorld = function (WORLD_CONFIG, container) {
    var worldGrid = [[], []];
    for (var i = 0; i < WORLD_CONFIG.constants.height; i++) {
        for (var j = 0; j < WORLD_CONFIG.constants.width; j++) {
            var Tile = Tile.init(0, WORLD_CONFIG.constants.tileWidth, WORLD_CONFIG.constants.tileHeight);
            container.addChild(Tile);
        }
    }
    return container;
};

var worldSetup = function (WORLD_CONFIG) {
    var WORLD = new PIXI.Container();
    // TODO : generate world grid here
    WORLD = worldSetup.prototype.buildWorld(WORLD_CONFIG, WORLD);
    WORLD.position.set(0, 0);
};

module.exports = {
    init: function (WORLD_CONFIG) {
        return worldSetup(WORLD_CONFIG);
    }
};
