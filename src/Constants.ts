export default class Constants {

    public static readonly APP_WIDTH = 1280;
    public static readonly APP_HEIGHT = 720;

    public static readonly KEY_BACKGROUND:string = "background";
    public static readonly KEY_PROPERTIES:string = "properties";
    public static readonly KEY_ENEMIES:string = "enemies";
    public static readonly KEY_BTN_PLAY:string = "btnPlay";

    public static readonly KEY_GHOST:string = "ghost";
    public static readonly KEY_GENIE:string = "genie";
    public static readonly KEY_VILLIAN:string = "villian";

    public static readonly KEY_TYPE:string = "type";
    public static readonly KEY_SOURCE:string = "source";
    public static readonly KEY_ANIMATIONS:string = "animations";
    public static readonly KEY_NAME:string = "name";
    public static readonly KEY_LOOP:string = "loop";
    public static readonly KEY_START_TIME:string = "animationStart";
    public static readonly KEY_END_TIME:string = "animationEnd";
    public static readonly KEY_TIME_SCALE:string = "timeScale";

    public static readonly KEY_STATES : string = "states";
    public static readonly KEY_TEXTURE : string = "texture";
    public static readonly KEY_NORMAL : string = "normal";
    public static readonly KEY_OVER : string = "over";
    public static readonly KEY_DOWN : string = "down";
    public static readonly KEY_DISABLE : string = "disable";

    public static readonly KEY_ENEMY_SPINE_ANIMATION_SHOW:string = "show";
    public static readonly KEY_ENEMY_SPINE_ANIMATION_IDLE:string = "idle";
    public static readonly KEY_ENEMY_SPINE_ANIMATION_HIDE:string = "hide";

    public static readonly ENEMY_DISPLAY_PROPERTIES: Array<string> = ["x","y","position","scale","anchor","angle","visible"];

    public static readonly EVENT_ON_FIELD_COUNTER:string = "onFieldCounter";
    public static readonly EVENT_ON_WIN:string = "onWin";

    public static readonly ENEMIES_TEXT:string = "Enemies: ";

    public static readonly URL_ASSETS_MANIFEST : Array<any> = [
        {
            "name": "atlas",
            "src": "./assets/atlas.json"
        },
        {
            "name": Constants.KEY_GHOST,
            "src": "./assets/spine/ghost/character.json"
        },
        {
            "name": Constants.KEY_GENIE,
            "src": "./assets/spine/genie/character.json"
        },
        {
            "name": Constants.KEY_PROPERTIES,
            "src": "./assets/properties.json"
        },
        {
            "name": "foo_yellow",
            "src": "./assets/fonts/foo_yellow.fnt"
        }
    ];
}