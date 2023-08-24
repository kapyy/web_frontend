import * as BABYLON from '@babylonjs/core';
import * as PIXI from 'pixi.js';
import {Spine} from "pixi-spine";
import {SpineClass}  from "./SpineControl";


export class Character {

    private spine: SpineClass;
    // private lastAnimation: string;
    private stage: PIXI.Container;
    // private position3d: BABYLON.Vector3;

    constructor(stage: PIXI.Container, pixiRenderer: PIXI.Renderer, spineData: Spine) {
        // this.lastAnimation = '';
        this.spine = new SpineClass(spineData);
        this.stage = stage;
        this.stage.addChild(this.spine.getSpineObject());
        this.spine.setPosition(pixiRenderer.screen.width / 3, pixiRenderer.screen.height);
        // this.position3d = new BABYLON.Vector3(0,0,0);
    }

}