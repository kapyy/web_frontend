import {Container, Renderer} from "pixi.js";
import * as PIXI from "pixi.js";
import {Engine} from "@babylonjs/core";

export class RenderControl {
    //create an instance of the class
    private static instance: RenderControl;
    private static PixiRenderer: PIXI.Renderer;
    //create a private constructor so that no instance can be created other than the class itself
    private constructor() {
    }

    //create a static method to get the instance of the class
    public static getInstance(): RenderControl {
        if (!RenderControl.instance) {
            RenderControl.instance = new RenderControl();
        }
        return RenderControl.instance;
    }

    onRenderer(render: Renderer, container: Container) {

        render.reset();
        render.render(container);
    }

    registerPIXIRenderer(engine: Engine) {
        return new PIXI.Renderer({
            context: engine._gl,
            view: engine.getRenderingCanvas() as HTMLCanvasElement,
            width: engine.getRenderWidth(),
            height: engine.getRenderHeight(),
            clearBeforeRender: false,
        });
    }
    getCurrentPIXIRenderer(engine: Engine) {
        if (!RenderControl.PixiRenderer) {
            RenderControl.PixiRenderer = this.registerPIXIRenderer(engine);
        }
        return RenderControl.PixiRenderer;
    }
}
