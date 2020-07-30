const MachinaFFXIV = require('node-machina-ffxiv');
const types = require('./types');

var ffi = require('@saleae/ffi');

var gamepad = ffi.Library('./build/Release/gamepad.dll', {
    "rumble": ['void', ['float', 'float', 'int']],
});

const Machina = new MachinaFFXIV();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const me = {
    actorSessionID: null,
};

Machina.start(async () => {
    gamepad.rumble(1, 1, 200);
    await sleep(200);
    gamepad.rumble(1, 1, 200);
});

Machina.on(types.actorCast, (content) => {
    if (content.sourceActorSessionID !== me.actorSessionID) {
        return;
    }
});

Machina.on(types.actorControlSelf, (content) => {
    me.actorSessionID = content.sourceActorSessionID;
});

Machina.on(types.effect, (content) => {
    if (content.sourceActorSessionID !== me.actorSessionID) {
        return;
    }

    gamepad.rumble(1, 1, 150);
});
