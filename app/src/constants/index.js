export const PIXI_SETTINGS = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 450,
    UI_WIDTH: 1334,
    UI_HEIGHT: 80,
    RENDER_OPTIONS: {
        antialias: false,
        transparent: false,
        resolution: 2
    }
};

export const GAME_SETTINGS = {
    ASSET_LOCATION: window.location.href + 'app/assets/',
    TILE_WIDTH:  50,
    TILE_HEIGHT: 50,
    GAME_WIDTH: 30,
    GAME_HEIGHT: 30
};

export const TILE_NAMES = {
    grass: 'grass-01',
    path: 'path-01',
    path_left: 'path-01left',
    path_right: 'path-01right'
};

export const CARTS_ALL = {
    cart_01: 'cart.png'
};

export const ASSET_LIST = [
    'grass-01.png',
    'path-01.png',
    'path-01left.png',
    'path-01right.png',
    'cart.png'
];

export const CART_CONFIG = {
    CART_WIDTH: 71,
    CART_HEIGHT: 159
};
