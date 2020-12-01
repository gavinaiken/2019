const path = require('path');
const utils = require('./utils');

function fuelToLaunch(mass) {
    return Math.floor(mass / 3) - 2;
}

function sumFuelToLaunch(parsedInput) {
    return parsedInput.reduce((acc, curr) => {
        acc += fuelToLaunch(curr);
        return acc;
    }, 0);
}

function sumFuelToLaunchIncludingFuelMass(parsedInput) {
    if (!Array.isArray(parsedInput)) {
        parsedInput = [parsedInput];
    }
    return parsedInput.reduce((acc, curr) => {
        let fuel = fuelToLaunch(curr);
        while (fuel > 0) {
            acc += fuel;
            fuel = fuelToLaunch(fuel);
        }

        return acc;
    }, 0);
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'));
    const parsedInput = input.split(/[\r\n]/).map(i => Number(i));
    console.log(parsedInput);
    console.log('solution to part 1 is', sumFuelToLaunch(parsedInput));
    console.log('solution to part 2 is', sumFuelToLaunchIncludingFuelMass(parsedInput));
}

module.exports = {
    run,
    fuelToLaunch,
    sumFuelToLaunchIncludingFuelMass
};
