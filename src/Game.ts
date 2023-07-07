import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import Constants from "./Constants";
import Button from "./controls/Button";
import Field from "./Field";

export class Game extends PIXI.Application<HTMLCanvasElement> {

    private _properties:any;

    private _field: Field;

    private _btnPlay: Button;

    private _tfCounter: PIXI.BitmapText;

    constructor( options: any ) {
        super( options );
    }

    public init() : void {

        this._properties = PIXI.Assets.cache.get(Constants.KEY_PROPERTIES);

        this._field = new Field( this._properties[Constants.KEY_ENEMIES] );
        this.stage.addChild(this._field);
        (this._field as any).on(Constants.EVENT_ON_FIELD_COUNTER, this.onFieldCounter.bind(this));
        (this._field as any).on(Constants.EVENT_ON_WIN, this.onWin.bind(this));

        this._btnPlay = new Button( {
            "normal": {
                "texture": "button_play"
            }
        } );
        this._btnPlay.position.set(640, 360);
        this._btnPlay.anchor.set( 0.5, 0.5 );
        this._btnPlay.setAction( this.onPlayClick.bind(this) );
        this.stage.addChild(this._btnPlay);


        this._tfCounter = new PIXI.BitmapText(Constants.ENEMIES_TEXT + "0", {fontName:"foo_yellow", align:"center"});
        this._tfCounter.anchor.set( 0.5, 0.5 );
        this._tfCounter.position.set( 640, 40 );
        this.stage.addChild( this._tfCounter );
    }

    private onPlayClick() : void {
        this._btnPlay.visible = false;
        this._btnPlay.setEnabled(false);
        this._field.restart();
    }

    private onFieldCounter( count:number ) : void {
        this._tfCounter.text = Constants.ENEMIES_TEXT + count;
    }

    private onWin( e:any ) : void {
        this._btnPlay.visible = true;
        this._btnPlay.scale.set(0.8,0.8);
        gsap.to( this._btnPlay.scale, {duration: 0.3, x:1,y:1, ease:"back.in", onComplete: () => {
                this._btnPlay.setEnabled(true);
            }
        } );

    }

}
