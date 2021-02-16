const MachinaFFXIV = require('node-machina-ffxiv');
const opCodes = require('./opCodes');

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

Machina.on("raw", (content) => {
    // console.log('content.opcode', content.opcode)

    if (content.opcode && content.opcode === opCodes.updatePositionHandler) {
        me.actorSessionID = content.sourceActorSessionID;
        return;
    }

    if (content.opcode === opCodes.actorCast) {
        if (content.sourceActorSessionID !== me.actorSessionID) {
            return;
        }
        gamepad.rumble(1, 1, 150);
    }
});
