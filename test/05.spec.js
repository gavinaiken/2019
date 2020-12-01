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
            // console.log(parsedInput);
            let finalState = solution.runIntCode(parsedInput);
            // console.log(finalState);
            expect(finalState.memory.join(',')).to.be.equal('3500,9,10,70,2,3,11,0,99,30,40,50');
        });
        it('matches the second example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('1,0,0,0,99');
            expect(solution.runIntCode(parsedInput).memory.join(',')).to.be.equal('2,0,0,0,99');
        });
        it('matches the third example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('2,3,0,3,99');
            expect(solution.runIntCode(parsedInput).memory.join(',')).to.be.equal('2,3,0,6,99');
        });
        it('matches the fourth example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('2,4,4,5,99,0');
            expect(solution.runIntCode(parsedInput).memory.join(',')).to.be.equal('2,4,4,5,99,9801');
        });
        it('matches the fifth example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('1,1,1,4,99,5,6,0,99');
            expect(solution.runIntCode(parsedInput).memory.join(',')).to.be.equal('30,1,1,4,2,5,6,0,99');
        });
    });

    describe('more op codes', () => {
        it ('equals uses position mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,9,8,9,10,9,4,9,99,-1,8');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 1);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);

            res = solution.runIntCode(parsedInput.slice(0), 8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);
        });

        it ('less than uses position mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,9,7,9,10,9,4,9,99,-1,8');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 1);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);

            res = solution.runIntCode(parsedInput.slice(0), 8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);
        });

        it ('equals uses immediate mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,3,1108,-1,8,3,4,3,99');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 1);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);

            res = solution.runIntCode(parsedInput.slice(0), 8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);
        });

        it ('less than uses immediate mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,3,1107,-1,8,3,4,3,99');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 1);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);

            res = solution.runIntCode(parsedInput.slice(0), 8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);
        });

        it ('jump test uses position mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 0);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);

            res = solution.runIntCode(parsedInput.slice(0), 18);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);
        });

        it ('jump test uses immediate mode correctly', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,3,1105,-1,9,1101,0,0,12,4,12,99,1');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 0);
            console.log(res)            
            expect(res.output[0]).to.be.equal(0);

            res = solution.runIntCode(parsedInput.slice(0), -8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1);
        });

        it ('larger example', () => {
            const parsedInput = utils.splitCommasToArrayOfNumber('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99');
            console.log(parsedInput)

            let res = solution.runIntCode(parsedInput.slice(0), 0);
            console.log(res)            
            expect(res.output[0]).to.be.equal(999);

            res = solution.runIntCode(parsedInput.slice(0), 8);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1000);

            res = solution.runIntCode(parsedInput.slice(0), 18);
            console.log(res)            
            expect(res.output[0]).to.be.equal(1001);
        });
    });
});
