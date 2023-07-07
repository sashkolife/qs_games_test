import {gsap} from "gsap";
import EnemySpineBase from "./EnemySpineBase";
import Constants from "../../Constants";

export default class EnemyGhost extends EnemySpineBase {

    constructor( props: any ) {
        super( props );
    }

    show() {
        super.show();
        gsap.killTweensOf(this);
        this.alpha = 0;
        gsap.to(this, {duration: 1, alpha: 1});
    }

    protected onAnimationComplete() {
        super.onAnimationComplete();
        if ( this._currentAnimationName == Constants.KEY_ENEMY_SPINE_ANIMATION_HIDE ) {
            gsap.killTweensOf(this);
            gsap.to(this, {duration: 0.2, alpha: 0});
        }
    }
}