const path = require('path');
const utils = require('./utils');

/*
    An Intcode program is a list of integers separated by commas (like 1,0,0,3,99). To run one, start by looking at the first integer (called position 0). Here, you will find an opcode - either 1, 2, or 99. The opcode indicates what to do; for example, 99 means that the program is finished and should immediately halt. Encountering an unknown opcode means something went wrong.

    Opcode 1 adds together numbers read from two positions and stores the result in a third position. The three integers immediately after the opcode tell you these three positions - the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.

    For example, if your Intcode computer encounters 1,10,20,30, it should read the values at positions 10 and 20, add those values, and then overwrite the value at position 30 with their sum.

    Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them. Again, the three integers after the opcode indicate where the inputs and outputs are, not their values.
 */

function add(params, memory) {
    let res = params[0] + params[1];
    memory[params[2]] = res;
}

function multiply(params, memory) {
    let res = params[0] * params[1];
    memory[params[2]] = res;
}

function storeInput(input, params, memory) {
    memory[params[0]] = input;
}

function getParams(numParams, lastIsStore, pos, modes, memory) {
    let params = [];
    let paramNum = 0;

    while (paramNum < numParams) {
        let mode = modes[paramNum] || '0';
        // last param is the store position?
        if (lastIsStore && paramNum === numParams - 1) {
            mode = '1';
        }
        if (mode === '0') {
            // position mode
            let paramPos = memory[pos + paramNum + 1];
            let param = memory[paramPos];
            params.push(param);
        } else if (mode === '1') {
            // immediate mode
            let param = memory[pos + paramNum + 1];
            params.push(param);
        } else {
            throw new Error(`Unknown mode ${mode}`);
        }

        paramNum++;
    }
    // return memory.slice(pos + 1, pos + 4);
    return params;
}

function runIntCode(memory, input) {
    let pointer = 0;
    let step = 0;
    let output = [];
    while (true) {
        let opcodeAndModes = memory[pointer];
        // console.log(pointer, memory)
        let opcode = opcodeAndModes % 100;
        let modes = opcodeAndModes.toString()
            .split('')
            .slice(0, -2)
            .reverse();
        console.log(`Pos ${pointer}, opcodeAndModes ${opcodeAndModes}, opcode ${opcode}, modes ${modes}`);
        if (opcode === 1) {
            let numParams = 3;
            let params = getParams(numParams, true, pointer, modes, memory);
            add(params, memory);
            pointer += numParams + 1;
        } else if (opcode === 2) {
            let numParams = 3;
            let params = getParams(numParams, true, pointer, modes, memory);
            multiply(params, memory);
            pointer += numParams + 1;
        } else if (opcode === 3) {
            let numParams = 1;
            let params = getParams(numParams, true, pointer, modes, memory);
            storeInput(input, params, memory);
            pointer += numParams + 1;
        } else if (opcode === 4) {
            let numParams = 1;
            let params = getParams(numParams, false, pointer, modes, memory);
            output.push(params[0]);
            pointer += numParams + 1;
        } else if (opcode === 5) {
            // jump-if-true
            let numParams = 2;
            let params = getParams(numParams, false, pointer, modes, memory);
            if (params[0] !== 0) {
                pointer = params[1];
            } else {
                pointer += numParams + 1;
            }
        } else if (opcode === 6) {
            // jump-if-false
            let numParams = 2;
            let params = getParams(numParams, false, pointer, modes, memory);
            if (params[0] === 0) {
                pointer = params[1];
            } else {
                pointer += numParams + 1;
            }
        } else if (opcode === 7) {
            let numParams = 3;
            let params = getParams(numParams, true, pointer, modes, memory);
            memory[params[2]] = (params[0] < params[1]) ? 1 : 0;
            pointer += numParams + 1;
        } else if (opcode === 8) {
            // less than
            let numParams = 3;
            let params = getParams(numParams, true, pointer, modes, memory);
            memory[params[2]] = (params[0] === params[1]) ? 1 : 0;
            pointer += numParams + 1;
        } else if (opcode === 99) {
            // equals
            break;
        } else {
            throw new Error(`Unknown opcode ${opcode} (with modes (${opcodeAndModes})`);
        }
        step++;
        // console.log(`Step ${step}, memory`, memory);
        if (step > 10000) { break; }
    }
    return { output, memory };
}

function partOne(input) {
    input = input.slice(0);

    let res = runIntCode(input, 1);

    return res.output;
}

function partTwo(input) {
    input = input.slice(0);

    let res = runIntCode(input, 5);

    return res.output;
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'));
    const parsedInput = utils.splitCommasToArrayOfNumber(input);
    console.log('input:', parsedInput);

    console.log('solution to part 1 is', partOne(parsedInput));
    console.log('solution to part 2 is', partTwo(parsedInput));
}

module.exports = {
    run,
    runIntCode,
};
