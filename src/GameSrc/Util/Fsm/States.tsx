
export function getStatesObj() {
    const states = {
        id: "character",
        initial: "idle",
        states: {
            idle: {
                on: {
                    // the transition from "idle" to "moving" is named "WALK_ACTIVATED"
                    // activate the action "toWalk" during this transition
                    WALK_ACTIVATED: {  target: "walking", actions: "toWalk" },
                    JUMP_ACTIVATED: {  target: "jumping", actions: "toJump" },
                    SHOOT_ACTIVATED: {  target: "shooting", actions: "toShoot" }
                }
            },
            walking: {
                on: {
                    IDLE_ACTIVATED: {  target: "idle",    actions: "toIdle" },
                    JUMP_ACTIVATED: {  target: "jumping", actions: "toJump" },
                    SHOOT_ACTIVATED: {  target: "shooting", actions: "toShoot" }
                }
            },
            jumping : {
                on: {
                    IDLE_ACTIVATED: {  target: "idle",    actions: "toIdle" },
                    WALK_ACTIVATED: {  target: "walking", actions: "toWalk" },
                    SHOOT_ACTIVATED: {  target: "shooting", actions: "toShoot" }
                }
            },
            shooting : {
                on: {
                    IDLE_ACTIVATED: {  target: "idle",    actions: "toIdle" },
                    WALK_ACTIVATED: {  target: "walking", actions: "toWalk" },
                    JUMP_ACTIVATED: {  target: "jumping", actions: "toJump" }
                }
            }
        }
    }
    return states;
}
