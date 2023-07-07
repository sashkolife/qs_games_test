import * as PIXI from "pixi.js";
import Constants from "../Constants";

export default class Button extends PIXI.Sprite {

    textureNormal:PIXI.Texture;
    textureOver:PIXI.Texture;
    textureDown:PIXI.Texture;
    textureDisable:PIXI.Texture;

    state:string;

    protected _actionClick: Function = null;

    constructor( states: any ) {
        super();

        const stateNorm:any = states[Constants.KEY_NORMAL];
        this.textureNormal = PIXI.Texture.from( stateNorm[Constants.KEY_TEXTURE] );

        const stateOver:any = states[Constants.KEY_OVER];
        if ( stateOver ) {
            this.textureOver = PIXI.Texture.from( stateOver[Constants.KEY_TEXTURE] );
        }

        const stateDown:any = states[Constants.KEY_DOWN];
        if ( stateDown ) {
            this.textureDown = PIXI.Texture.from( stateDown[Constants.KEY_TEXTURE] );
        }

        const stateDisable:any = states[Constants.KEY_DISABLE];
        if ( stateDisable ) {
            this.textureDisable = PIXI.Texture.from( stateDisable[Constants.KEY_TEXTURE] );
        }

        this.setState( Constants.KEY_NORMAL );

        this.setEnabled( true );

        const self : any = this;
        self.on("mouseover", this.onOver.bind(this));
        self.on("mouseout", this.onOut.bind(this));
        self.on("mouseoutoutside", this.onOut.bind(this));
        self.on("mousedown", this.onStart.bind(this));
        self.on("mouseup", this.onEnd.bind(this));
        self.on("mouseupoutside", this.onEndOutside.bind(this));
        self.on("touchstart", this.onStart.bind(this));
        self.on("touchend", this.onEnd.bind(this));
        self.on("touchendoutside", this.onEndOutside.bind(this));
    }

    setEnabled( value: boolean ) : void {
        (this as any).cursor = value ? "pointer" : "none";
        (this as any).interactive = value;
    }

    setState( newState: string = Constants.KEY_NORMAL ): void {
        if ( this.state == newState ) {
            return;
        }

        this.state = newState;

        switch ( this.state ) {
            case Constants.KEY_NORMAL:
                this.texture = this.textureNormal;
                break;
            case Constants.KEY_OVER:
                this.texture = this.textureOver||this.textureNormal;
                break;
            case Constants.KEY_DOWN:
                this.texture = this.textureDown||this.textureNormal;
                break;
            case Constants.KEY_DISABLE:
                this.texture = this.textureDisable||this.textureNormal;
                break;
        }
    }

    setAction(fn:Function):void {
        this._actionClick = fn;
    }

    onOver(e:any): void {
        this.setState( Constants.KEY_OVER );
    }

    onOut(e:any): void {
        this.setState( Constants.KEY_NORMAL );
    }

    onStart(e:any): void {
        this.setState( Constants.KEY_DOWN );
    }

    onEnd(e:any): void {
        this.setState( Constants.KEY_NORMAL );
        if ( this._actionClick != null ) {
            this._actionClick( this );
        }
    }

    onEndOutside(e:any): void {
        this.setState( Constants.KEY_NORMAL );
    }
}