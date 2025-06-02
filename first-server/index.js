const http = require('http');
const fs = require('fs');

const eventEmitter  = require

let data = "My name is Arman Ali. I'm from Skardu."

http.createServer((req, res) => {
    console.log("Server Running");

    if (req.url === '/') {
        fs.writeFileSync('home.txt', data);
        res.end('Home written');
    }else if(req.url === '/about'){
        fs.writeFileSync("about.txt", data)
        res.end("about written");
    }else if(req.url === '/contact'){
        fs.writeFileSync("contact.txt", data)
        res.end('contact written');
    }else if(req.url === '/hey'){
        fs.writeFileSync("hey.txt", data)
        res.end('hey written');
    }
     else {
        res.end('Not Found');
    }
}).listen(7000, () => {
    console.log("Server is listening on port 7000");
});

