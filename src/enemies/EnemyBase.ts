import {Container} from "pixi.js";
import Constants from "../Constants";

export default class EnemyBase extends Container {

    static STATUS_SHOWN:number = 1;
    static STATUS_HIDDEN:number = 2;

    protected _status:number = EnemyBase.STATUS_HIDDEN;

    constructor( protected _properties: any ) {
        super();

        this.applyProperties();
    }

    protected applyProperties() : void {
        Constants.ENEMY_DISPLAY_PROPERTIES.forEach( key => {
            if ( this._properties[key] ) {
                (this as any)[key] = this._properties[key];
            }
        });
    }

    isShown() {
        return this._status == EnemyBase.STATUS_SHOWN;
    }

    show() {
        this._status = EnemyBase.STATUS_SHOWN;
    }

    hide() {
        this._status = EnemyBase.STATUS_HIDDEN;
    }
}