import * as PIXI from "pixi.js";
import Constants from "./Constants";
import {Game} from "./Game";

const mainContainer = document.getElementById("main-container");

const onResize = () => {
    const ratio = Math.min(window.innerWidth / Constants.APP_WIDTH, window.innerHeight / Constants.APP_HEIGHT );
    mainContainer.style.transform = "scale(" + ratio + ")";
}

window.onresize = onResize;

onResize();

const game = new Game( {
    width: Constants.APP_WIDTH,
    height: Constants.APP_HEIGHT,
    backgroundColor: 0x000000
} );

const names:Array<string> = [];

Constants.URL_ASSETS_MANIFEST.forEach( (assetData:any) => {
    PIXI.Assets.add( assetData.name, assetData.src );
    names.push(assetData.name);
} );

PIXI.Assets.load( names ).then( () => {

    const gameContainer = document.getElementById("game-container");

    gameContainer.appendChild( game.view );

    game.init();
});