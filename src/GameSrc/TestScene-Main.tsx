// import 'pixi-spine';
import * as BABYLON from '@babylonjs/core';
import * as PIXI from "pixi.js";
import { createMachine, interpret } from "xstate";
import TestFile from "./TestFile";
// scene
import {GameSceneManager} from "./ManagerClass/Scene/GameSceneManager";
// time
import {GameTimeManager} from "./ManagerClass/Time/GameTimeManager";
// character
import {ContainerManager} from "./ManagerClass/Scene/ContainerManager";
import {RenderControl} from "./ManagerClass/Scene/RenderControl";
import {Character} from "./GUI/Container/CharacterClass";
import {EventControl} from "./GUI/Container/EventControl";
import {getStatesObj} from "./Util/Fsm/States";
import {getActionsObj} from "./Util/Fsm/Actions";
// GUI
import {loadGUI} from "./GUI/loadGUI";
import { memo } from 'react';
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

const onSceneReady = (scene: BABYLON.Scene, engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {

    // scene basics: camera, lights, ground
    GameSceneManager.getInstance().onSceneReady();

    // 2d Pixi Spine
    const pixiRenderer = RenderControl.getInstance().registerPIXIRenderer(GameSceneManager.engine);
    const stage = ContainerManager.getInstance().CurrentContainer;
    stage.interactive = true;     // stage.eventMode = 'static';

    // Load spine assets and pass them to the callback function
    const assetUrl = 'https://raw.githubusercontent.com/pixijs/examples/gh-pages/examples/assets/pixi-spine/spineboy-pro.json';
    PIXI.Assets.load(assetUrl).then(   (spineboyAsset: any) => {
        const character = new Character(stage, pixiRenderer, spineboyAsset.spineData);
        // Define state machine -- takes in two objects: states (state+transition), actions (animation+movement)
        const statesObj = getStatesObj();
        const actionsObj = getActionsObj(character);
        const characterMachine = createMachine(statesObj, actionsObj);
        const service = interpret(characterMachine).start();
        onAssetsLoaded(character, service);
    });

    // PIXI.Assets.load("https://pixijs.com/assets/bunny.png").then((res) => {
    //     var exampleSelect = new exampleGUIClass(res);
    //     exampleSelect.registerSelectEvent();
    //     exampleSelect.selector.x = pixiRenderer.screen.width / 2;
    //     exampleSelect.selector.y = pixiRenderer.screen.height / 2;
    //     stage.addChild(exampleSelect.selector);
    // })
    loadGUI(stage);


    function onAssetsLoaded(character: Character, service:any ) {
        // Update 3D position and spine animation in the game loop
        engine.runRenderLoop(() => {
            EventControl.getInstance(service);
        });
    }

    //time update
    scene.onBeforeRenderObservable.add(() => {
        GameTimeManager.getInstance().updateTime();
    });
    // @ts-ignore
    globalThis.__PIXI_STAGE__ = stage;
    // @ts-ignore
    globalThis.__PIXI_RENDERER__ = RenderControl.getInstance().getCurrentPIXIRenderer(GameSceneManager.engine);

};
function onRender() {
    var renderControl = RenderControl.getInstance();
    renderControl.onRenderer(renderControl.getCurrentPIXIRenderer(GameSceneManager.engine), ContainerManager.getInstance().CurrentContainer);
}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------


export default memo(() => (
    <div>
        <TestFile antialias={true} engineOptions={{}} adaptToDeviceRatio={false} sceneOptions={{}} rest={[]} onSceneReady={onSceneReady} onRender={onRender} />
    </div>
));
