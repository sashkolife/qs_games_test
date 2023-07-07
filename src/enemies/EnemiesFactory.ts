import Constants from "../Constants";
import EnemyGhost from "./spine/EnemyGhost";
import EnemyGenie from "./spine/EnemyGenie";
import EnemyVillian from "./sprite/EnemyVillian";
import EnemyBase from "./EnemyBase";

export default class EnemiesFactory {

    createEnemy( props:any ) : EnemyBase {

        const type:string = props[ Constants.KEY_TYPE ];

        let enemy:EnemyBase = null;

        switch( type ) {
            case Constants.KEY_GHOST:
                enemy = new EnemyGhost( props );
                break;
            case Constants.KEY_GENIE:
                enemy = new EnemyGenie( props );
                break;
            case Constants.KEY_VILLIAN:
                enemy = new EnemyVillian( props );
                break;
        }

        return enemy;
    }
}