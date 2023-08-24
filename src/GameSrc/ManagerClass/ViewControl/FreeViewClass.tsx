import { UniversalCamera, GroundMesh, ExecuteCodeAction, ActionManager } from "@babylonjs/core";

export class FreeViewClass {

    private XStartPoint = 0;
    private YStartPoint = 0;
    private XEndPoint = 0;
    private YEndPoint = 0;

    public isDragging = false;
    public isTrail = true;

    constructor(camera:UniversalCamera, canvas:HTMLCanvasElement, ground:GroundMesh) {
        
        this.isDragging = false;
  
        ground.actionManager = new ActionManager(camera.getScene());
        ground.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, () => {
          if (!this.isDragging) {
            this.isDragging = true;
            this.XEndPoint = camera.getScene().pointerX;
            this.YEndPoint = camera.getScene().pointerY;
            console.log('start Drag');
          }
        }));
  
        canvas.addEventListener("pointermove", (e) => {
          if (this.isDragging) {
            e.preventDefault();
            this.isTrail = false;
            this.XStartPoint = this.XEndPoint - camera.getScene().pointerX;
            this.YStartPoint = this.YEndPoint - camera.getScene().pointerY;
            this.XEndPoint = camera.getScene().pointerX;
            this.YEndPoint = camera.getScene().pointerY;
            camera.position.x += this.XStartPoint / 100;
            camera.position.z -= this.YStartPoint / 100;
          }
        });
  
        canvas.addEventListener("pointerup", () => {
          this.isDragging = false;
          console.log('stop Drag');
        });
    }
    // .
    /*        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const xmlLoader = new XmlLoader();
        xmlLoader.loadLayout("layouts/testgui.xml", advancedTexture, function () {
        xmlLoader.getNodeById("FindDobitButton").onPointerClickObservable.add(function(){
            freeview.isTrail = true;
            camera1.position.x=hero.position.x;
            camera1.position.z=hero.position.z-10;
        })*/
}