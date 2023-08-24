import * as PIXI from 'pixi.js';
export class AssetLoader
{
    //create an instance of the class
    private static instance: AssetLoader;
    //create a private constructor so that no instance can be created other than the class itself
    private constructor() { }
    //create a static method to get the instance of the class
    public static getInstance(): AssetLoader {
        if (!AssetLoader.instance) {
            AssetLoader.instance = new AssetLoader();
        }
        return AssetLoader.instance;
    }

}