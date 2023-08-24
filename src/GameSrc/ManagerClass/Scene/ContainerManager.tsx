import * as PIXI from 'pixi.js';
export class ContainerManager
{
    //create an instance of the class
    private static instance: ContainerManager;
    //create a private constructor so that no instance can be created other than the class itself
    CurrentContainer: PIXI.Container;
    private constructor() {
        this.CurrentContainer = new PIXI.Container();
    }
    //create a static method to get the instance of the class
    public static getInstance(): ContainerManager {
        if (!ContainerManager.instance) {
            ContainerManager.instance = new ContainerManager();
        }
        return ContainerManager.instance;
    }

}