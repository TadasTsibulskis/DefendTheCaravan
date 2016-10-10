'use strict';

var GAME_CONFIG = require('../utils/gameConfig.js');
var WORLD_CONFIG = require('../utils/worldConfig.js');

var rotateRandom = function (sprite) {
	var min = 1;
	var max = 4;
	var random = (Math.floor(Math.random() * (max - min + 1)) + min);

	var degree = 0;

	switch (random) {
		case 1 : {
			degree = 0;
			break;
		}

		case 2 : {
			degree = (Math.PI / 2);
			break;
		}

		case 3 : {
			degree = Math.PI;
			break;
		}

		case 4 : {
			degree = ((3 * Math.PI) / 2);
			break;
		}

		default : {
			break;
		}
	}
	sprite.rotation = degree;

	return sprite;
};

var tile = function ($ASSETS, type) {
	var tileName = '';
	var rotateable = false;
	switch (type) {
		case 'grass' : {
			tileName = WORLD_CONFIG.tile_names.grass;
			rotateable = true;
			break;
		}

		case 'path' : {
			tileName = WORLD_CONFIG.tile_names.path;
			rotateable = true;
			break;
		}

		case 'path_left' : {
			tileName = WORLD_CONFIG.tile_names.path_left;
			rotateable = false;
			break;
		}

		case 'path_right' : {
			tileName = WORLD_CONFIG.tile_names.path_right;
			rotateable = false;
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
	sprite.pivot._x = WORLD_CONFIG.constants.TILE_WIDTH / 2;
	sprite.pivot._y = WORLD_CONFIG.constants.TILE_HEIGHT / 2;
	sprite.type = tileName;
	if (rotateable) {
		sprite = rotateRandom(sprite);
	}
	return sprite;
};

module.exports = {
	init: function ($ASSETS, type) {
		return tile($ASSETS, type);
	}
};
