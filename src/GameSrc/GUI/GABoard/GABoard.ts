import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { Log } from './Log';
import { Schedule } from './Schedule';
import { GABoardTabs } from './GABoardTabs';

export class GABoard{

    private gaBoard : PIXI.Graphics;

    private TabsList : GABoardTabs[] = [];
    private UITabsContainer : PIXIUI.List;

    private hideButton : PIXIUI.Button;
    
    constructor(){

        this.gaBoard = new PIXI.Graphics().beginFill(0xff00ff).drawRect(0, 300, 250, 400);
        this.UITabsContainer= new PIXIUI.List();
        this.hideButton = new PIXIUI.Button(new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(200, 650, 50, 25, 15)
        );
    }

    initGaBoard(){
        var log = new Log(this);
        var schedule = new Schedule(this);

        log.initGaBoardTabs();
        schedule.initGaBoardTabs();
        
        this.TabsList.push(log);
        this.TabsList.push(schedule);
        
        this.addTabButtons(log.getButton());
        this.addTabButtons(schedule.getButton());

        this.hideButton.onPress.connect(() => this.setVisible(false));

        this.gaBoard.addChild(this.hideButton.view);
        this.gaBoard.addChild(this.UITabsContainer);

        this.setVisible(false);
    }

    getBoard(){
        return this.gaBoard;
    }

    showGaBoard(){
        this.setVisible(true);
        this.loadData();
        this.TabsList[0].showList();
    }

    setVisible(isvisible: boolean) {
        this.gaBoard.visible = isvisible;
    }

    loadData(){
        //load data
        for (const element of this.TabsList) {
            element.loadData();
        }
    }

    loadResource(){
        //load resource
    }

    addTabButtons(btn:PIXIUI.Button){
        // tabs_button_list.push(btn);
        this.UITabsContainer.addChild(btn.view);
    }

    hideAllLists(){
        for (const element of this.TabsList) {
            element.setVisible(false);
        }
    }
}