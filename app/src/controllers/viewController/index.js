import { Container } from 'pixi.js';

import { PIXI_SETTINGS } from 'constants';

import cartViewController from './cart';

function uiSetup() {
}

export default function viewController(resources) {
    const stage = new Container();
    const cart = cartViewController(resources);
    stage.addChild(cart);

    return stage;
};
