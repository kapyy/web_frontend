export class GameTimeManager {

    //create an instance of the class
    private static instance: GameTimeManager;
    public timeMultiplier = 60;
    public startTime: Date;
    public currentScene = "unknown";
    private static tickerConstant = 30;
    private tickerUpdate = 0;
    public updateFunctionList: any[] = [];

    public currentGameTime ={
        currentYear: 0,
        currentMonth: 0,
        currentWeek: '',
        currentDay: 0,
        currentHour: 0,
        currentMinute: 0,
    }

    constructor() {
        //set the start time 2000/10/1 12:00:00
        this.startTime = new Date(2021, 7, 19, 12, 0, 0);
        //start update time
        this.updateTime();
    }

    //create a static method to get the instance of the class
    public static getInstance(): GameTimeManager {
        if (!GameTimeManager.instance) {
            GameTimeManager.instance = new GameTimeManager();
        }
        return GameTimeManager.instance;
    }

    public static GetCurrentDate(): object {
        //Get From Server

        GameTimeManager.instance.refreshGameTime();
        return GameTimeManager.getInstance().currentGameTime;
    }
    private refreshGameTime() {
        //current time get from server
        const currentTime = new Date();
        // const elapsedTime = (currentTime.getTime() - this.startTime.getTime()) * this.timeMultiplier;
        const GameTime = new Date(currentTime.getTime());
        this.currentGameTime.currentYear = GameTime.getFullYear();
        this.currentGameTime.currentMonth = GameTime.getMonth();
        this.currentGameTime.currentWeek = GameTime.toLocaleDateString('en-US', { weekday: 'long' });
        this.currentGameTime.currentDay = GameTime.getDay();
        this.currentGameTime.currentHour = GameTime.getHours();
        this.currentGameTime.currentMinute = GameTime.getMinutes();

    }
    updateTime() {

        //update function list
        this.updateFunctionList.forEach((func) => {
            func();
        });

        //Every {tickerconstant} frames update time
        this.tickerUpdate++;
        if (this.tickerUpdate > GameTimeManager.tickerConstant) {
            this.tickerUpdate = 0;

            this.refreshGameTime();
            if (this.currentScene === "unknown") {
                if (this.currentGameTime.currentHour >= 22 || this.currentGameTime.currentHour < 6) {
                    this.currentScene = "night";
                }
                else {
                    this.currentScene = "day";
                }
            }
            if (this.currentGameTime.currentHour === 22 && this.currentScene === "day") {
                this.switchScene("night");
            }
            else if (this.currentGameTime.currentHour === 6 && this.currentScene === "night") {
                this.switchScene("day");
            }
            console.log(`Game time: ${this.currentGameTime.currentYear}/${this.currentGameTime.currentMonth}/${this.currentGameTime.currentDay} ${this.currentGameTime.currentWeek} ${this.currentGameTime.currentHour}:${this.currentGameTime.currentMinute}:00, Scene: ${this.currentScene}`);

        }


    }

    addFunctionToUpdate(func: any) {
        this.updateFunctionList.push(func);
    }
    popFunctionToUpdate(func: any) {
        const index = this.updateFunctionList.indexOf(func);
        if (index > -1) {
            this.updateFunctionList.splice(index, 1);
        }
    }
    clearFunctionToUpdate() {
        this.updateFunctionList = [];
    }

    switchScene(scene: string) {
        // switch day to night
        if (scene === "night") {
            this.currentScene = "night";
            // add code here
            // hide day objects show night objects
            // this.scene.getMeshByName("dayScene").setEnabled(false);
            // this.scene.getMeshByName("nightScene").setEnabled(true);
        }
        // switch night to day
        else if (scene === "day") {
            this.currentScene = "day";
            // add code here
            // hide night objects show day objects
            // this.scene.getMeshByName("nightScene").setEnabled(false);
            // this.scene.getMeshByName("dayScene").setEnabled(true);
        }
    }
}