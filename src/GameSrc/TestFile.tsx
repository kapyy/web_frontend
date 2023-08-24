import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import {EngineOptions} from "@babylonjs/core/Engines/thinEngine";
import {SceneOptions} from "@babylonjs/core/scene";
import * as PIXI from "pixi.js";
import {GameSceneManager} from "./ManagerClass/Scene/GameSceneManager";

export class ExportSetting{
    antialias = true;
    engineOptions:EngineOptions = {};
    adaptToDeviceRatio = true;
    sceneOptions:SceneOptions = {};
    // inputCanvas = useRef(null);
    rest = [];
    onSceneReady = function (scene: Scene,engine:Engine,canvas:HTMLCanvasElement) {
    }

    onRender = function (scene: Scene) {
    }


}
export default function TestFile({antialias,engineOptions,adaptToDeviceRatio,sceneOptions,onSceneReady,onRender,...rest}:ExportSetting) {
    const reactCanvas = useRef(null);

    // set up basic engine and scene
    useEffect(() => {
        const { current: canvas } = reactCanvas;
        console.log('useEffect  in test file')
        if (!canvas) return;

        const engine = new Engine(canvas, antialias, engineOptions,adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);
        GameSceneManager.InitScene(engine,scene,canvas);

        if (scene.isReady()) {
            onSceneReady(scene,engine,canvas);
        } else {
            scene.onReadyObservable.addOnce((scene) =>onSceneReady(scene,engine,canvas));
        }

        engine.runRenderLoop(() => {
            scene.render();
            engine.wipeCaches(true)
            if (typeof onRender === "function") onRender(scene);

        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }, [antialias, engineOptions, adaptToDeviceRatio,sceneOptions,onRender,onSceneReady]);

    return <canvas
        style={{
            width: "100%",
            height: "100%",
        }}
        ref={reactCanvas}
        {...rest} />;
};