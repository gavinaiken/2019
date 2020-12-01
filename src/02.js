const path = require('path');
const utils = require('./utils');

/*
    An Intcode program is a list of integers separated by commas (like 1,0,0,3,99). To run one, start by looking at the first integer (called position 0). Here, you will find an opcode - either 1, 2, or 99. The opcode indicates what to do; for example, 99 means that the program is finished and should immediately halt. Encountering an unknown opcode means something went wrong.

    Opcode 1 adds together numbers read from two positions and stores the result in a third position. The three integers immediately after the opcode tell you these three positions - the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.

    For example, if your Intcode computer encounters 1,10,20,30, it should read the values at positions 10 and 20, add those values, and then overwrite the value at position 30 with their sum.

    Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them. Again, the three integers after the opcode indicate where the inputs and outputs are, not their values.
 */

function add(params, parsedInput) {
    let res = parsedInput[params[0]] + parsedInput[params[1]];
    parsedInput[params[2]] = res;
}

function multiply(params, parsedInput) {
    let res = parsedInput[params[0]] * parsedInput[params[1]];
    parsedInput[params[2]] = res;
}

function runIntCode(parsedInput) {
    let pos = 0;
    let step = 0;
    while (true) {
        let opcode = parsedInput[pos];
        let params = parsedInput.slice(pos + 1, pos + 4);
        if (opcode === 1) {
            add(params, parsedInput);
        }
        if (opcode === 2) {
            multiply(params, parsedInput);
        }
        if (opcode === 99) {
            break;
        }
        pos += 4;
        step++;
        // console.log(parsedInput)
        if (step > 10000) { break; }
    }
    return parsedInput;
}

function partOne(input) {
    input = input.slice(0);
    input[1] = 12;
    input[2] = 2;
    return runIntCode(input)[0];
}

function testPair(noun, verb, input) {
    input = input.slice(0);
    input[1] = noun;
    input[2] = verb;
    return runIntCode(input)[0];
}

function testPairs(input) {
    console.log('testpairs')
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let res = testPair(noun, verb, input);
            if (res === 19690720) {
                return noun * 100 + verb;
            }
        }
    }
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'));
    const parsedInput = utils.splitCommasToArrayOfNumber(input);
    console.log('input:', parsedInput);

    console.log('solution to part 1 is', partOne(parsedInput));
    console.log('solution to part 2 is', testPairs(parsedInput));
}

module.exports = {
    run,
    runIntCode,
};
