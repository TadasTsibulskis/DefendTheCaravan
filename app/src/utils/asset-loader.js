import {
    ASSET_LIST,
    GAME_SETTINGS
} from 'constants';

function buildAssetArray(assetList, gameSettings) {
    var arr = [];
    for (var i = 0; i < assetList.length; i++) {
        arr[i] = gameSettings.ASSET_LOCATION + assetList[i];
    }
    return arr;
};

function loadingInProgress(loader, resource) {
    console.log('loading resource: ' + resource.url);
    console.log('progress: ' + loader.progress + '%');
};

export default function beginLoad(loader, callback) {
    var assetsToLoad = buildAssetArray(ASSET_LIST, GAME_SETTINGS);
    assetsToLoad.forEach((e, i) => {
        loader.add(assetsToLoad[i]);
    })
    // loader.add(assetsToLoad);
    loader.on('progress', loadingInProgress);
    loader.load(callback);
    return loader.resources;
};
