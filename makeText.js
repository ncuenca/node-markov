/** Command-line tool to generate Markov text. */

const fsP = require("fs/promises");
const axios = require('axios');
const MarkovMachine = require("./markov");

const argv = process.argv;

async function cat(filename) {
    try {
        let contents = await fsP.readFile(`${filename}`, "utf8");
        // console.log("file contents:", contents);
        return contents

    } catch (err) {
        console.log(`Error fetching ${filename}:
            ${filename} isn't a valid path`);
        process.exit(1);
    }
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
        return resp.data

    } catch (err) {
        console.log(`Error fetching ${url}:
            ${url} isn't a valid url`);
        process.exit(1);
    }
}

async function handler(){
    let text ;

    if ( argv[2] === "file"){
        text = await cat(argv[3])
    }
    else if (argv[2] === "url"){
        text =  await webCat(argv[3])
    }

    let mm = new MarkovMachine(text);
    console.log(mm.getText())

}


handler()