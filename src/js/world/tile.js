'use strict';

var GAME_CONFIG = require('../utils/gameConfig.js');
var WORLD_CONFIG = require('../utils/worldConfig.js');

var tile = function ($ASSETS, type) {
	var tileName = '';
	switch (type) {
		case 0 : {
			tileName = WORLD_CONFIG.tile_names.grass;
			break;
		}

		default : {
			break;
		}
	}
	var data = $ASSETS[WORLD_CONFIG.constants.ASSET_LOCATION + tileName + '.png'];
	var sprite = new GAME_CONFIG.PIXI.Sprite(data.texture);
	sprite.width = WORLD_CONFIG.constants.TILE_WIDTH;
	sprite.height = WORLD_CONFIG.constants.TILE_HEIGHT;
	return sprite;
};

module.exports = {
	init: function ($ASSETS, type) {
		return tile($ASSETS, type);
	}
};
