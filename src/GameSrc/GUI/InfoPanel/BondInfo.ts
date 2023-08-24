import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';

export class BondInfo{

    private bondInfo : PIXI.Graphics;

    private title : PIXI.Text;
    
    constructor(){

        this.bondInfo = new PIXI.Graphics().beginFill(0xff4444).drawRect(700, 125, 350, 500);

        this.title = new PIXI.Text("bond info panel test");
        this.title.position.x=780;
        this.title.position.y=130;
    }

    initBondInfo(){
        this.bondInfo.addChild(this.title);
    }
    
    getInfo(){
        return this.bondInfo;
    }

    loadData() {
        //load bond data
    }

    loadResource(){
        //load resource
    }
}