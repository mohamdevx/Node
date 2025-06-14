const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Serve the form on GET /
    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <!DOCTYPE html>
            <html>
            <head><title>User Form</title></head>
            <body>
                <h1>Enter your name and gender</h1>
                <form action="/submit" method="POST">
                    <input type="text" name="username" placeholder="Enter your name" required /><br><br>
                    <input type="radio" id="male" name="gender" value="Male" required />
                    <label for="male">Male</label><br>
                    <input type="radio" id="female" name="gender" value="Female" />
                    <label for="female">Female</label><br><br>
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);
        return res.end();
    }

    // Handle form submission
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        // Collect the form data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // After data is fully received
        req.on('end', () => {
            // Parse the data (e.g., "username=Ali&gender=Male")
            const parsedData = new URLSearchParams(body);
            const username = parsedData.get('username');
            const gender = parsedData.get('gender');

            const output = `Name: ${username}, Gender: ${gender}\n`;

            // Append to a file (or create it if not exists)
            fs.appendFile('user_data.txt', output, (err) => {
                if (err) {
                    console.error('Failed to write file:', err);
                    res.statusCode = 500;
                    return res.end('Server error');
                }

                // Response back
                res.setHeader('Content-Type', 'text/html');
                res.write(`<html><body><h1>Thanks, ${username}!</h1><p>Your data has been saved.</p></body></html>`);
                return res.end();
            });
        });

        return;
    }

    // Fallback route
    res.statusCode = 404;
    res.end('<h1>404 - Page Not Found</h1>');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
