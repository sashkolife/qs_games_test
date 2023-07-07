import {Assets} from "pixi.js";
import {Spine, ISkeletonData, ITrackEntry} from "pixi-spine";
import EnemyBase from "../EnemyBase";
import Constants from "../../Constants";

export default class EnemySpineBase extends EnemyBase {

    protected _animation:Spine;
    protected _animationEntry:any;
    protected _currentAnimationName:string = null;

    constructor(props:any) {
        super(props);

        this.createAnimation();
    }

    protected createAnimation() {
        const spineData:ISkeletonData = Assets.cache.get( this._properties[Constants.KEY_SOURCE] ).spineData as ISkeletonData;
        this._animation = new Spine( spineData );
        this._animation.state.addListener( {
            complete: this.onAnimationComplete.bind(this)
        });

        this._animation.visible = false;

        this.addChild( this._animation );
    }

    show() {
        super.show();
        this._animation.visible = true;
        this.playAnimation( Constants.KEY_ENEMY_SPINE_ANIMATION_SHOW );
    }

    protected playAnimation( animId: string ): void {
        this._currentAnimationName = animId;

        const properties = this._properties[Constants.KEY_ANIMATIONS][animId];

        if ( !properties ) {
            this.onAnimationComplete();
            return;
        }

        const name = properties[Constants.KEY_NAME];
        const loop = Boolean(properties[Constants.KEY_LOOP]);
        const startTime = properties[Constants.KEY_START_TIME];
        const endTime = properties[Constants.KEY_END_TIME];
        const timeScale = properties[Constants.KEY_TIME_SCALE]||1;

        this._animationEntry = this._animation.state.setAnimation( 0, name, loop );

        if ( startTime ) {
            this._animationEntry.animationStart = startTime;
        }

        if ( endTime ) {
            this._animationEntry.animationEnd = endTime;
        }

        this._animationEntry.timeScale = timeScale;

        this._animation.autoUpdate = true;
    }

    hide() {
        super.hide();
        this.playAnimation( Constants.KEY_ENEMY_SPINE_ANIMATION_HIDE );
    }

    protected onAnimationComplete() {
        if ( this._currentAnimationName == Constants.KEY_ENEMY_SPINE_ANIMATION_SHOW ) {
            this.playAnimation( Constants.KEY_ENEMY_SPINE_ANIMATION_IDLE );
        }
    }

}