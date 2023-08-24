import {Engine, Scene} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import exp from "constants";

export class GameSceneManager {
    //create an instance of the class
    private static instance: GameSceneManager;
    //create a private constructor so that no instance can be created other than the class itself
    public static engine: Engine;
    public static scene: Scene;
    public static canvas: HTMLCanvasElement;

    private constructor() { }
    //create a static method to get the instance of the class
    public static getInstance(): GameSceneManager {
        if (!GameSceneManager.instance) {
            GameSceneManager.instance = new GameSceneManager();
        }
        return GameSceneManager.instance;
    }
    public static InitScene(engine: BABYLON.Engine,scene:BABYLON.Scene, canvas: HTMLCanvasElement) {

        this.engine = engine;
        this.scene = scene;
        this.canvas = canvas;
    }
    onSceneReady(){
        //camera
        const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI/2 , 2, new BABYLON.Vector3(0, 3, 8), GameSceneManager.scene);
        camera.attachControl(GameSceneManager.canvas, true);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 10;
        camera.wheelDeltaPercentage = 0.01;

        // lights
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), GameSceneManager.scene);
        light.intensity = 0.6;
        light.specular = BABYLON.Color3.Black();

        const light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), GameSceneManager.scene);
        light2.position = new BABYLON.Vector3(0, 5, 5);

        // Ground
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, GameSceneManager.scene);
        ground.material = new BABYLON.StandardMaterial("groundMaterial", GameSceneManager.scene);
    }
}
