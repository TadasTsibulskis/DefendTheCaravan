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
	var data = $ASSETS[WORLD_CONFIG.constants.assetLocation + tileName + '.png'];
	var sprite = new GAME_CONFIG.PIXI.Sprite(data.texture);
	return sprite;
};

module.exports = {
	init: function ($ASSETS, type) {
		return tile($ASSETS, type);
	}
};
