import {Interpreter} from "xstate"

export class EventControl {
    private static instance: EventControl;
    // private animMap: { [key: string]: string };
    private fsmEventMap: { [key: string]: string };
    private service: Interpreter<any>;

    constructor(service: Interpreter<any>) {
        // this.animMap = {
        //     'w': 'walk',
        //     's': 'shoot',
        //     'j': 'jump',
        // }
        this.fsmEventMap = {
            'w': 'WALK_ACTIVATED',
            's': 'SHOOT_ACTIVATED',
            'j': 'JUMP_ACTIVATED',
        }

        this.service = service;

        // Add a listener for keydown events
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    public static getInstance(service: Interpreter<any>): EventControl {
        if (!EventControl.instance) {
            EventControl.instance = new EventControl(service);
        }
        return EventControl.instance;
    }

    public handleKeyDown(event: KeyboardEvent) {
        const key = event.key;
        const fsmEvent = this.fsmEventMap[key];

        // get an array of all possible values of this.fsmEventMap
        const fsmEventValues = Object.values(this.fsmEventMap);
        if (fsmEventValues.includes(fsmEvent)) {
            this.service.send(fsmEvent);
            console.log('event sent: ', fsmEvent);
        } else {
            this.service.send('IDLE_ACTIVATED');
            console.log('event sent: IDLE_ACTIVATED');
        }
    }

    public handleKeyUp(event: KeyboardEvent) {
        this.service.send('IDLE_ACTIVATED');
        console.log('event sent: IDLE_ACTIVATED');
    }
}