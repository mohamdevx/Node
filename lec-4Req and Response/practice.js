const  http=require('http');


const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
    if(req.url === '/home') {
        res.write('<h1>Welcome to home</h1>');
        return res.end();
    } else if(req.url === '/men') {
        res.write('<h1>welmoc to men</h1>');
        return res.end();
    } else if(req.url === '/') {
        res.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/Men">Men</a></li>
                    <li><a href="/women">Women</a></li>
                    <li><a href="/kids">Kids</a></li> 
                    <li><a href="/cart">Cart</a></li> 
                </ul>
            </nav>
        </body>
        </html>
        `);
        return res.end();
    } else {
        res.write('<h1>404 Not Found</h1>');
        return res.end();
    }
})

server.listen(3001,()=>{
    console.log('server is running on port 3001');

})