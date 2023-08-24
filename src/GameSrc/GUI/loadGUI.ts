import * as PIXI from 'pixi.js';
import { MainPanel } from "./MainPanel/MainPanel";

export function loadGUI(stage:PIXI.Container){
    
    const mainpanel = new MainPanel();
    mainpanel.initMainPanel();
    stage.addChild(mainpanel.getPanel());
    mainpanel.setVisible(true);
}