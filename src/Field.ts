import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import Constants from "./Constants";
import EnemyBase from "./enemies/EnemyBase";
import EnemiesFactory from "./enemies/EnemiesFactory";
import {cli} from "webpack";

export default class Field extends PIXI.Container {

    private _enemiesFactory: EnemiesFactory = new EnemiesFactory();

    private _enemiesViews: Array<EnemyBase> = [];

    private _viewsCounter:number = 0;

    private _missIcon:PIXI.Sprite;
    private _hitIcon:PIXI.Sprite;

    constructor( private _enemiesData:Array<any> ) {

        super();

        const texture:PIXI.Texture = PIXI.Texture.from(Constants.KEY_BACKGROUND);
        const bg: PIXI.Sprite = new PIXI.Sprite( texture );
        this.addChild(bg);

        this.addEnemies();

        this._missIcon = new PIXI.Sprite( PIXI.Texture.from("miss_click") );
        this._missIcon.anchor.set(0.5,0.5);
        this._missIcon.alpha = 0;
        this.addChild(this._missIcon);

        this._hitIcon = new PIXI.Sprite( PIXI.Texture.from("hit_click") );
        this._hitIcon.anchor.set(0.5,0.5);
        this._hitIcon.alpha = 0;
        this.addChild(this._hitIcon);

        (this as any).onmouseup = this.onFieldClick.bind(this);
        (this as any).touchend = this.onFieldClick.bind(this);
    }

    private addEnemies() : void {
        this._enemiesData.forEach( eData => {
            const enemyView:EnemyBase = this._enemiesFactory.createEnemy( eData );
            this.addChild( enemyView );
            this._enemiesViews.push( enemyView );
        } );
    }

    private setViewsCounter( counter: number ) : void {

        const self: any = this;

        self._viewsCounter = counter;

        if ( self._viewsCounter <= 0 ) {
            self._viewsCounter = 0;
            self.setEnabled( false );
            self.emit( Constants.EVENT_ON_WIN );
        }

        self.emit( Constants.EVENT_ON_FIELD_COUNTER, this._viewsCounter );
    }

    public setEnabled( value:boolean ) : void {
        (this as any).interactive = value;
    }

    public restart() : void {
        this.setEnabled( true );

        this._enemiesViews.forEach( enemyView => {
            enemyView.show();
        } );

        this.setViewsCounter( this._enemiesViews.length );
    }

    onFieldClick(e:any) : void {

        const localCoords: PIXI.Point = this.toLocal(e.global);

        let killCounter: number = 0;

        this._enemiesViews.forEach( viewEnemy => {
            if ( viewEnemy.isShown() ) {
                const viewBounds : PIXI.Rectangle = viewEnemy.getBounds();
                if ( viewBounds.contains(localCoords.x, localCoords.y) ) {
                    viewEnemy.hide();
                    killCounter++;
                }
            }
        } );

        let clickIcon:PIXI.Sprite;
        if ( killCounter > 0 ) {
            this.setViewsCounter(this._viewsCounter -= killCounter);
            clickIcon = this._hitIcon;
        } else {
            clickIcon = this._missIcon;
            const fieldShake = gsap.timeline();
            fieldShake.to(this, { duration:0.05, y: 4, x: Math.random() < 0.5 ? 4 : -4 });
            fieldShake.to(this, { duration:0.05, y: 0, x: 0 });
        }

        clickIcon.alpha = 1;
        clickIcon.position = localCoords;
        this.addChild(clickIcon);

        gsap.to( clickIcon, { duration: 0.1, alpha: 0 } );

    }
}