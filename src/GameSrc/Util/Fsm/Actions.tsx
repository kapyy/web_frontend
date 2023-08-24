// need loop:           ['hoverboard', 'idle', 'run', 'shoot', 'walk']
// doesn't need loop:   ['aim', 'death', 'jump', 'portal']

export function getActionsObj(character:any) {
    const actions = {
        actions: {
            toIdle: (context:any, event:any) => {
                console.log("toIdle running", event);
                character.spine.playAnimation('idle', true);
            },
            toWalk: (context:any, event:any) => {
                console.log("toWalk running", event);
                character.spine.playAnimation('walk', true);
            },
            toJump: (context:any, event:any) => {
                console.log("toJump running", event);
                character.spine.playAnimation('jump', false);
            },
            toShoot: (context:any, event:any) => {
                console.log("toShoot running", event);
                character.spine.playAnimation('shoot', true);
            }
        }

    }
    return actions;
}

