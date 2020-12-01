const path = require('path');
const expect = require('chai').expect;
const utils = require('../src/utils');

const testfilename = path.basename(__filename, '.spec.js');
const solution = require(path.join('..', 'src', testfilename));

describe(`Day ${testfilename}`, () => {
    /*

    1,9,10,3,2,3,11,0,99,30,40,50 becomes 3500,9,10,70,2,3,11,0,99,30,40,50

    Here are the initial and final states of a few more small programs:

    1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
    2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
    2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
    1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.
     */

    describe('runIntCode', () => {
        it('matches the first example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('1,9,10,3,2,3,11,0,99,30,40,50');
            console.log(parsedInput);
            let finalState = solution.runIntCode(parsedInput);
            console.log(finalState);
            expect(solution.runIntCode(parsedInput).join(',')).to.be.equal('3500,9,10,70,2,3,11,0,99,30,40,50');
        });
        it('matches the second example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('1,0,0,0,99');
            expect(solution.runIntCode(parsedInput).join(',')).to.be.equal('2,0,0,0,99');
        });
        it('matches the third example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('2,3,0,3,99');
            expect(solution.runIntCode(parsedInput).join(',')).to.be.equal('2,3,0,6,99');
        });
        it('matches the fourth example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('2,4,4,5,99,0');
            expect(solution.runIntCode(parsedInput).join(',')).to.be.equal('2,4,4,5,99,9801');
        });
        it('matches the fifth example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('1,1,1,4,99,5,6,0,99');
            expect(solution.runIntCode(parsedInput).join(',')).to.be.equal('30,1,1,4,2,5,6,0,99');
        });
    });
});
