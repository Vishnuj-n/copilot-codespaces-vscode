// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');

const port = 3000;
const host = 'localhost';

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url).pathname;
    const filePath = path.join(__dirname, urlPath);
    const extname = path.extname(filePath);

    if (req.method === 'GET' && urlPath === '/comments') {
        comments.getComments(req, res);
    } else if (req.method === 'POST' && urlPath === '/comments') {
        comments.postComment(req, res);
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
                return;
            }

            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});