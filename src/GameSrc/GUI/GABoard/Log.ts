import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { GABoardTabs } from './GABoardTabs';
import { GABoard } from './GABoard';
import { Gaboard_log } from 'GameSrc/Util/Api/GUI/GABoard';

export class Log extends GABoardTabs{
    
    constructor(parent:GABoard){
        super(parent);
        this.DataAPI = Gaboard_log;
    }


    loadResource(){
        // load resource
    }
}