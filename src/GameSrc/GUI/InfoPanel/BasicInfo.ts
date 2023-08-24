import * as PIXIUI from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { Infoboard, updatedInfo } from '../../Util/Api/GUI/InfoPanel';

export class BasicInfo{

    private basicInfo : PIXI.Graphics;

    private title : PIXI.Text;
    private name : PIXI.Text;
    private sex : PIXI.Text;
    private job : PIXI.Text;
    private creator : PIXI.Text;
    private description : PIXIUI.Input;
    private personality : PIXI.Text[] = [];
    
    constructor(){

        this.basicInfo = new PIXI.Graphics().beginFill(0x4444ff).drawRect(350, 125, 350, 500);

        this.title = new PIXI.Text("basic info panel test");
        this.title.position.x=430;
        this.title.position.y=130;

        this.name = new PIXI.Text("");
        this.name.position.x=400;
        this.name.position.y=180;

        this.sex = new PIXI.Text("");
        this.sex.position.x=400;
        this.sex.position.y=220;

        this.job = new PIXI.Text("");
        this.job.position.x=400;
        this.job.position.y=260;

        this.creator= new PIXI.Text("");
        this.creator.position.x=400;
        this.creator.position.y=300;

        this.description = new PIXIUI.Input({
            bg: new PIXI.Graphics().beginFill(0x0011ff).drawRect(0, 0, 300, 100),
            placeholder: 'Enter text',
            padding: {
                top: 11,
                right: 11,
                bottom: 11,
                left: 11
            } ,
            value:"demo description",
        });
        this.description.position.x = 400;
        this.description.position.y = 340;

        this.personality[0] = new PIXI.Text("");
        this.personality[0].position.x=400;
        this.personality[0].position.y=490;

        this.personality[1] = new PIXI.Text("");
        this.personality[1].position.x=480;
        this.personality[1].position.y=490;
    }

    initBasicInfo(){
        this.description.onChange.connect(() => this.updateInfo());
        this.basicInfo.addChild(this.title);
        this.basicInfo.addChild(this.name);
        this.basicInfo.addChild(this.sex);
        this.basicInfo.addChild(this.job);
        this.basicInfo.addChild(this.creator);
        this.basicInfo.addChild(this.description);
        this.basicInfo.addChild(this.personality[0]);
        this.basicInfo.addChild(this.personality[1]);
    }

    getInfo(){
        return this.basicInfo;
    }

    loadData() {
        var InpcIm = {
            "role_id": "10000111001",
            "npc_id": "00000"
        }
        Infoboard(InpcIm).then((res) => {
            this.name.text = res.data.name;
            this.sex.text = res.data.sex;
            this.job.text = res.data.job;
            this.creator.text = res.data.creator;
            this.description.value = res.data.description;
            this.personality[0].text = res.data.personality[0];
            this.personality[1].text = res.data.personality[1];
        });
    }

    updateInfo(){
        var newInfo = {
            "role_id": "10000111001",
            "npc_id": "00000",
            "description" : this.description.value
        }
        updatedInfo(newInfo).then((res) => {
            this.description.value=res.data;
        });
    }

    loadResource(){
        //load resource
    }
}