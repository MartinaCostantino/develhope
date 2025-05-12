import { createServer } from 'node:http';

const server = createServer((req, res) => {
    console.log('Request received');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/application/json');

    const jsonResponse = JSON.stringify({'Location': 'Mars'});
    res.end(jsonResponse);    
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

// content-length:19