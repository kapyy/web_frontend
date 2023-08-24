import { UniversalCamera, Observable, Vector2, Vector3 } from "@babylonjs/core";

export class CameraTrailClass {

    private cameraStartPoint = new Vector3(0, 5, -10);

    private XObservor = new Observable<number>;
    private ZObservor = new Observable<number>; //connect executor and obj
    private TrailObservor = new Observable<boolean>;

    private centerpoint = new Vector3(0, 0, 0);
    private centerScreenSize = new Vector2(5,2);
    
    //create
    constructor(camera:UniversalCamera) {
        this.setCameraAction(this.XObservor,this.ZObservor,camera,this.centerpoint,this.centerScreenSize,this.cameraStartPoint);
    }

    //set obj
    setObj(hero:any, isTrail:boolean){
        this.XObservor.notifyObservers(hero.position.x);
        this.ZObservor.notifyObservers(hero.position.z);
        
        this.TrailObservor.notifyObservers(isTrail);
    }

    //set trail observe
    setCameraAction(XObservor:any,ZObservor:any,cam:UniversalCamera, centerpoint:Vector3, centerScreenSize:Vector2, cameraStartPoint:Vector3){
        this.TrailObservor.add(function(value){
            if(value === true){
                XObservor.add(function(val:number){
                    if (val - centerpoint.x >= centerScreenSize.x) {
                        cam.position.x = val - centerScreenSize.x + cameraStartPoint.x;
                        centerpoint.x = cam.position.x - cameraStartPoint.x;
                    }
                    else if (centerpoint.x - val >= centerScreenSize.x) {
                        cam.position.x = val + centerScreenSize.x + cameraStartPoint.x;
                        centerpoint.x = cam.position.x - cameraStartPoint.x;
                    }
                });
                ZObservor.add(function(val:number){
                    if (val - centerpoint.z >= centerScreenSize.y) {
                        cam.position.z = val - centerScreenSize.y + cameraStartPoint.z;
                        centerpoint.z = cam.position.z - cameraStartPoint.z;
                    }
                    else if (centerpoint.z - val >= centerScreenSize.y) {
                        cam.position.z = val + centerScreenSize.y + cameraStartPoint.z;
                        centerpoint.z = cam.position.z - cameraStartPoint.z;
                    }
                });
            }
            else if(value === false){
                console.log(cam.position.z);
                XObservor.clear();
                ZObservor.clear();
            }
        })
    }
}