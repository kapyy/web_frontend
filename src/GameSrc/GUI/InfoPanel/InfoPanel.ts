import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { BasicInfo } from './BasicInfo';
import { BondInfo } from './BondInfo';

export class InfoPanel{

    private Infopanel : PIXI.Graphics;

    private basicInfopanel : BasicInfo;
    private bondInfopanel : BondInfo;

    private closeButton : PIXIUI.Button;
    
    constructor(){

        this.Infopanel = new PIXI.Graphics().beginFill(0xffffff).drawRect(350, 125, 700, 500);

        this.basicInfopanel = new BasicInfo();
        this.bondInfopanel = new BondInfo();
        
        this.closeButton = new PIXIUI.Button(new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(1000, 125, 50, 25, 15)
        );
    }

    initInfoPanel(){
        this.closeButton.onPress.connect(() => this.setVisible(false));

        this.basicInfopanel.initBasicInfo();
        this.bondInfopanel.initBondInfo();

        this.Infopanel.addChild(this.basicInfopanel.getInfo());
        this.Infopanel.addChild(this.bondInfopanel.getInfo());
        this.Infopanel.addChild(this.closeButton.view);

        this.setVisible(false);
    }

    getPanel(){
        return this.Infopanel;
    }

    loadData(){
        this.basicInfopanel.loadData();
        this.bondInfopanel.loadData();
    }

    showInfoPanel(){
        this.setVisible(true);
        this.loadData();
    }

    setVisible(isvisible: boolean) {
        this.Infopanel.visible = isvisible;
    }

    loadResource(){
        this.basicInfopanel.loadResource();
        this.bondInfopanel.loadResource();
    }
}