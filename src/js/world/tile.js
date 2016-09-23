'use strict';

var PIXI = require('pixi.js');

var tile = function (WORLD_CONFIG, type) {
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
	var texture = PIXI.Texture.fromImage(WORLD_CONFIG.constants.assetLocation + tileName);
	PIXI.extras.TilingSprite.call(this, texture, WORLD_CONFIG.constants.tileWidth, WORLD_CONFIG.constants.tileHeight);
	return texture;
};

module.exports = {
    init: function (WORLD_CONFIG, type) {
        return tile(WORLD_CONFIG, type);
    }
};
