import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { InfoPanel } from '../InfoPanel/InfoPanel'
import { GABoard } from '../GABoard/GABoard';

export class MainPanel{

    private mainpanel : PIXI.Graphics;
    
    private npcbutton : PIXIUI.Button; // substitute npc
    private gabutton : PIXIUI.Button; 

    private infopanel : InfoPanel;
    private gaboard : GABoard;
    
    constructor(){

        this.mainpanel = new PIXI.Graphics().beginFill(0xffffff,0).drawRect(0, 0, 1500, 750);

        this.infopanel = new InfoPanel();
        this.gaboard = new GABoard();
        
        this.npcbutton = new PIXIUI.Button(new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(100, 100, 100, 50, 15)
        );
        this.npcbutton.onPress.connect(() => this.infopanel.loadData());

        this.gabutton = new PIXIUI.Button(new PIXI.Graphics()
            .beginFill(0x00ffff)
            .drawRoundedRect(100, 200, 100, 50, 15)
        );
    }

    initMainPanel(){
        this.npcbutton.onPress.connect(() => this.infopanel.showInfoPanel());
        this.gabutton.onPress.connect(() => this.gaboard.showGaBoard());

        this.infopanel.initInfoPanel();
        this.gaboard.initGaBoard();

        this.mainpanel.addChild(this.infopanel.getPanel());
        this.mainpanel.addChild(this.gaboard.getBoard());

        this.mainpanel.addChild(this.npcbutton.view);
        this.mainpanel.addChild(this.gabutton.view);

        this.setVisible(false);
    }

    getPanel(){
        return this.mainpanel;
    }

    setVisible(isvisible: boolean) {
        this.mainpanel.visible = isvisible;
    }

    loadResource(){
        //adhere resourse to panel
        this.infopanel.loadResource();
        this.gaboard.loadResource();
    }
}