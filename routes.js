const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile('message.txt', {encoding: "utf-8"}, (err,data) => {
            if(err){
                console.log(err);
            }
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        })
    }
    
    else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, (err) => {
                if(err){
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node Js project</title></head>');
        res.write('<body><h1>Hello from Node Js Server!</h1></body>');
        res.write('</html>');
        res.end();
    }
}

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';


exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
 