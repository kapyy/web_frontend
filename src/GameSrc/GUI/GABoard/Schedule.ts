import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { GABoardTabs } from './GABoardTabs';
import { GABoard } from './GABoard';
import { Gaboard_schedule } from 'GameSrc/Util/Api/GUI/GABoard';

export class Schedule extends GABoardTabs{

    constructor(parent:GABoard){
        super(parent);
        this.DataAPI = Gaboard_schedule;
    }

    loadResource(){
        //load resource
    }
}