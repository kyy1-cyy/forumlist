// This is our proxy server. It will run on Render.

// 1. Import necessary tools
const express = require('express'); // A popular framework for building web servers in Node.js
const fetch = require('node-fetch'); // A tool to let our server make HTTP requests, just like a browser
const path = require('path'); // A tool to help work with file paths

// 2. Setup the server
const app = express(); // Create a new express application
const PORT = process.env.PORT || 3000; // Render will tell us what port to use. If not, we use 3000.

// The base URL for the Rookie's server we need to download from.
const ROOKIE_BASE_URL = 'https://go.vrpyourself.online/';

// 3. Create the proxy endpoint
// When a user wants to download a game, the website will send a request here.
// e.g., /download/1a2b3c4d5e6f (where the last part is the game hash)
app.get('/download/:hash', async (req, res) => {
    const { hash } = req.params; // Get the game hash from the URL
    const remoteUrl = `${ROOKIE_BASE_URL}${hash}/`; // Construct the full URL to the Rookie server

    console.log(`Proxying request for hash: ${hash}`);

    try {
        // 4. Fetch the file from the Rookie server
        // We act like a legitimate tool, so Cloudflare should let us through.
        const response = await fetch(remoteUrl, {
            headers: {
                // Pretend to be a normal browser to avoid some simple blocks
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        // 5. Check if the Rookie server responded correctly
        if (!response.ok) {
            // If the server sent an error (e.g., file not found), send that error to the user.
            throw new Error(`Failed to fetch from remote server: ${response.statusText}`);
        }

        // 6. Stream the file to the user
        // This is the magic part. We don't wait for the whole file to download to our server.
        // We send it to the user piece by piece as we receive it. This is fast and saves memory.
        res.setHeader('Content-Disposition', `attachment; filename="${hash}.zip"`); // Tell the user's browser to treat this as a download
        response.body.pipe(res); // Connect the download stream directly to the user's response

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Error proxying the request.');
    }
});

// 7. Serve the main website files (index.html, style.css, script.js)
// This makes our server also host the website itself.
app.use(express.static(path.join(__dirname, '')));

// 8. Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
