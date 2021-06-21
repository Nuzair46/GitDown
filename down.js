const fetch = require("node-fetch");

var link = "https://github.com/mrpond/BlockTheSpot/blob/master/BlockTheSpot.bat";
//convert to "https://raw.githubusercontent.com/mrpond/BlockTheSpot/master/BlockTheSpot.bat";

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
        return "Not a github url";
    }
}
var rawUrl = urlToRaw(link);
console.log(urlToRaw(link));
fetch(rawUrl).then(response => response.text()).then(text => console.log(text))


//console.log(rawToFile(rawUrl));





