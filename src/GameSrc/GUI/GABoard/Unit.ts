import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';

export class Unit{
    private unitContainer : PIXI.Graphics;
    private text : PIXI.Text;

    constructor(){
        this.unitContainer = new PIXI.Graphics().beginFill(0x6733ff).drawRect(0, 350, 250, 25);
        this.text = new PIXI.Text();
    }

    initUnit(){
        this.unitContainer.addChild(this.text);
        this.text.position.x=0;
        this.text.position.y=350;
    }
    
    getUnit(){
        return this.unitContainer;
    }

    loadText(content: string) {
        this.text.text = content;
    }
}