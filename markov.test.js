const MarkovMachine = require('./markov');
const fsP = require("fs/promises");

describe("tests MarkovMachine", function () {
    
    let catInHatMM;

    beforeEach(function () {
        catInHatMM = new MarkovMachine("the cat in the hat");
    });

    test("test makeChains", function () {
        let emptyMM = new MarkovMachine("");
        expect(emptyMM.chains).toEqual({"": [null]});
        expect(catInHatMM.chains).toEqual({ the: ['cat', 'hat'], 
                                            cat: ['in'], 
                                            in: ['the'], 
                                            hat: [null] });
    });

    test("test getText", function () {
        expect(catInHatMM.getText(numWords=1).split(/[ \r\n]+/).length).toEqual(1);
        expect(catInHatMM.getText().split(/[ \r\n]+/).length).toBeLessThanOrEqual(100);
    });
});