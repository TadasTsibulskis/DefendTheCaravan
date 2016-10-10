'use strict';

var GAME_CONFIG = require('../utils/gameConfig.js');
var HERO_CONFIG = require('./heroConfig.js');

var hero = function ($ASSETS, type) {
	var cartType = 'cart';
	var data = $ASSETS[HERO_CONFIG.constants.ASSET_LOCATION + cartType + '.png'];
	var sprite = new GAME_CONFIG.PIXI.Sprite(data.texture);
	// sprite.width = HERO_CONFIG.constants.HERO_WIDTH;
	// sprite.height = HERO_CONFIG.constants.HERO_HEIGHT;
    sprite.scale.set(1, 1);
	// sprite.x = (GAME_CONFIG.constants.GAME_WIDTH / 2) - (sprite.width / 2);
    // sprite.y = (GAME_CONFIG.constants.GAME_HEIGHT / 2) - (100);
	return sprite;
};

module.exports = {
	init: function ($ASSETS, type) {
		return hero($ASSETS, type);
	}
};
