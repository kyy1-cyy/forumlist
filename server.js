const express = require('express');
const axios = require('axios'); // We will use axios now
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const ROOKIE_BASE_URL = 'https://go.vrpyourself.online/';

app.get('/download/:hash', async (req, res) => {
    const { hash } = req.params;
    const remoteUrl = `${ROOKIE_BASE_URL}${hash}/`;

    console.log(`Proxying request for hash: ${hash} to URL: ${remoteUrl}`);

    try {
        // Make our request look as much like a real browser as possible
        const response = await axios({
            method: 'get',
            url: remoteUrl,
            responseType: 'stream', // This is important for streaming the download
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.google.com/' // Pretend we came from a trusted site
            }
        });

        // Tell the user's browser to download the file
        res.setHeader('Content-Disposition', `attachment; filename="${hash}.zip"`);
        
        // Pipe the downloaded file stream directly to the user
        response.data.pipe(res);

    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).send('Error proxying the request.');
    }
});

// Serve the main website files
app.use(express.static(path.join(__dirname, '')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
