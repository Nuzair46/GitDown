const fetch = require("node-fetch");
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const { createWriteStream } = require('fs');

const pipe = promisify(pipeline);

var myArgs = process.argv.slice(2);

let link = myArgs[0];

let raw = "https://raw.githubusercontent.com";

function urlToRaw(url) {
    var newUrl;
    if (url.startsWith("https://github.com")){
        newUrl = url.replace("https://github.com", raw);
        newUrl = newUrl.replace("/blob",'');
        return newUrl;
    }
    else if (url.startsWith("https://www.github.com")){
        newUrl = url.replace("https://www.github.com", raw);
        newUrl = newUrl.replace("/blob",'');
        return newUrl;
    }
    else{
        console.log("Not a github url");
        return null;
    }
}
async function rawToFile(url){
    let response = await fetch(rawUrl);
    let data = await response.text();
    createFile(data);
}

function fileName(url){
    var names = url.split("/");
    return names[names.length - 1];
}

function createFile(content){
    do_gzip(content.toString(), `${fileName(link)}.gz`);
}

async function do_gzip(input, output) {
  const gzip = createGzip();
  const source = input;
  const destination = createWriteStream(output);
  await pipe(source, gzip, destination);
}

let rawUrl = urlToRaw(link);
rawToFile(rawUrl);