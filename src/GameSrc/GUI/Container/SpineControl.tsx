import {Spine} from "pixi-spine";
import 'pixi-spine';

export class SpineClass {
    private spineBoyPro: Spine;
    // private singleAnimations: string[];
    // private loopAnimations: string[];

    constructor(spineData: any) {
        this.spineBoyPro = new Spine(spineData);
        this.spineBoyPro.scale.set(0.5);
        // this.singleAnimations = ['aim', 'death', 'jump', 'portal'];
        // this.loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
    }
    // SetAnimationLoop(animations: string[]) {
    //     this.loopAnimations = animations;
    // }
    // public concatAnimations(): string[] {
    //     return this.singleAnimations.concat(this.loopAnimations);
    // }
    public getSpineObject(): Spine {
        return this.spineBoyPro;
    }
    public setPosition(x: number, y: number): void {
        this.spineBoyPro.x = x;
        this.spineBoyPro.y = y;
    }
    public playAnimation(animation: string, loop: boolean): void {
        this.spineBoyPro.state.setAnimation(0, animation, loop);
    }
}
