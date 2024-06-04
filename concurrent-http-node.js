const https = require('https');

const endpoints = ['https://example1.com', 'https://example2.com', 'https://example3.com']; // Add your desired endpoints
const numRequests = 50; // Number of concurrent requests per endpoint
const delay = 60 * 1000 / numRequests; // Delay between requests in milliseconds (1 minute / numRequests)

// Function to make HTTPS requests to multiple endpoints
function makeRequest(id, endpoint) {
    const startTime = new Date();
    const options = {
        hostname: endpoint.replace('https://', ''),
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
            'Host': endpoint.replace('https://', ''),
            'User-Agent': 'Node.js HTTPS Client'
        }
    };
    const req = https.request(options, (res) => {
        const endTime = new Date();
        const latency = endTime - startTime;
        console.log(`Request ${id} to ${endpoint}: Status Code ${res.statusCode}, Destination IP ${options.hostname}, Latency ${latency}ms`);
    });
    req.on('error', (err) => {
        console.error(`Error in request ${id} to ${endpoint}: ${err.message}`);
    });
    req.end();
}

// Start concurrent HTTPS requests to each endpoint
endpoints.forEach((endpoint) => {
    for (let i = 0; i < numRequests; i++) {
        makeRequest(i, endpoint);
    }
});

// Function to periodically make HTTPS requests
function startRequests() {
    endpoints.forEach((endpoint) => {
        for (let i = 0; i < numRequests; i++) {
            makeRequest(i, endpoint);
        }
    });
    setTimeout(startRequests, delay);
}

startRequests();
