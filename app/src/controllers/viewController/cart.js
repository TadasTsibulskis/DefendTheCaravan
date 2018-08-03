import { Sprite, utils } from 'pixi.js';
import { GAME_SETTINGS, CART_CONFIG, PIXI_SETTINGS } from 'constants';

export default function cartViewController(loader) {
  var cartType = 'cart';
  var texture = loader.resources[GAME_SETTINGS.ASSET_LOCATION + cartType + '.png'].texture;
  var sprite = new Sprite(texture);
  sprite.width = CART_CONFIG.CART_WIDTH;
  sprite.height = CART_CONFIG.CART_HEIGHT;
  sprite.x = Math.ceil((PIXI_SETTINGS.GAME_WIDTH / 2) - (sprite.width / 2));
  sprite.y = Math.ceil((PIXI_SETTINGS.GAME_HEIGHT / 2) - (sprite.height / 2));
  return sprite;
}