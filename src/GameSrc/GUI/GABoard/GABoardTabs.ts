import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { Unit } from './Unit';
import { GABoard } from './GABoard';
import {Gaboard_log, Gaboard_schedule} from "../../Util/Api/GUI/GABoard";

export class GABoardTabs {
    private parent: GABoard;
    protected button: PIXIUI.Button;
    protected view : PIXI.Graphics;
    protected list: PIXIUI.List;
    protected unit: Unit[] = [];
    protected unitAmount = 10;
    protected DataAPI: any;

    constructor(parent: GABoard) {
        this.parent = parent;
        this.view = new PIXI.Graphics().beginFill(0xffffff).drawRoundedRect(0, 350, 200, 300, 10);
        this.list = new PIXIUI.List({
            elementsMargin:10,
        });
        for (var i = 0; i < this.unitAmount; i++) {
            this.unit.push(new Unit());
        }
        this.button = new PIXIUI.Button(new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(20, 320, 50, 25, 15)
        );
    }

    initGaBoardTabs() {
        this.view.addChild(this.list);
        this.unit.forEach((item) => item.initUnit());
        this.unit.forEach((item) => this.list.addChild(item.getUnit()));
        this.button.onPress.connect(() => this.showList());
        this.parent.getBoard().addChild(this.list);
    }

    showList() {
        this.parent.hideAllLists();
        this.list.visible = true;
    }

    setVisible(isVisible: boolean) {
        this.list.visible = isVisible;
    }

    getButton() {
        return this.button;
    }

    loadData() {
        const data = this.DataAPI();
        for (let i = 0; i < this.unitAmount; i++) {
            this.unit[i].loadText(data[i]);
        }
    }

    loadResource(){
        //only define
    }

}