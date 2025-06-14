const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if(req.url=='/'){
         res.setHeader('Content-Type', 'text/html');  // ← use 'text/html' instead of 'text/plain'

    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>'); // ← fixed 'titel' to 'title'
    res.write('<body><h1>Welcome to Home</h1></body>');
    res.write('</html>');

    return res.end(); // ← return to avoid further processing
    } else if (req.url==='/products'){
        res.setHeader('Content-Type', 'text/html');  // ← use 'text/html' instead of 'text/plain'

        res.write('<html>');
        res.write('<head><title>Complete Coding</title></head>'); // ← fixed 'titel' to 'title'
        res.write('<body><h1>Chekproudtts</h1></body>');
        res.write('</html>');

        res.end();
    }

    
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
