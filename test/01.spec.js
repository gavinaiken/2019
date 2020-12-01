const path = require('path');
const expect = require('chai').expect;

const testfilename = path.basename(__filename, '.spec.js');
const solution = require(path.join('..', 'src', testfilename));

describe(`Day ${testfilename}`, () => {
    /*

    Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

    For example:

    For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
    For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
    For a mass of 1969, the fuel required is 654.
    For a mass of 100756, the fuel required is 33583.
    The Fuel Counter-Upper needs to know the total fuel requirement. To find it, individually calculate the fuel needed for the mass of each module (your puzzle input), then add together all the fuel values.
     */

    describe('fuelToLaunch', () => {
        it('matches the first example', () => {
            expect(solution.fuelToLaunch(12)).to.be.equal(2);
        });
        it('matches the second example', () => {
            expect(solution.fuelToLaunch(14)).to.be.equal(2);
        });
        it('matches the third example', () => {
            expect(solution.fuelToLaunch(1969)).to.be.equal(654);
        });
        it('matches the fourth example', () => {
            expect(solution.fuelToLaunch(100756)).to.be.equal(33583);
        });
    });

    describe('fuelToLaunch', () => {
        it('matches the first example', () => {
            expect(solution.sumFuelToLaunchIncludingFuelMass(12)).to.be.equal(2);
        });
        it('matches the second example', () => {
            expect(solution.sumFuelToLaunchIncludingFuelMass(14)).to.be.equal(2);
        });
        it('matches the third example', () => {
            expect(solution.sumFuelToLaunchIncludingFuelMass(1969)).to.be.equal(966);
        });
        it('matches the fourth example', () => {
            expect(solution.sumFuelToLaunchIncludingFuelMass(100756)).to.be.equal(50346);
        });
    });
});
