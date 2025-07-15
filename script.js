document.addEventListener('DOMContentLoaded', () => {
    const changeUrlBtn = document.getElementById('change-url-btn');
    if(changeUrlBtn) {
        changeUrlBtn.onclick = () => {
            const newUrl = prompt('Enter the new Rookie Base URL:');
            if (newUrl) {
                localStorage.setItem('rookieBaseUrl', newUrl);
                rookieBaseUrl = newUrl;
                alert('Base URL updated successfully!');
            } else {
                alert('URL update cancelled.');
            }
        };
    }

    const homePage = document.getElementById('home-page');
    const gamesListPage = document.getElementById('games-list-page');
    const helpPage = document.getElementById('help-page');
    const postsContainer = document.getElementById('posts-container');
let rookieBaseUrl = localStorage.getItem('rookieBaseUrl');

/**
 * md5.js
 * Copyright (c) 2011, Yoshinori Kohyama
 * support@y-koh.com
 * http://www.y-koh.com/
 * 
 * The MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var md5 = (function(){

    var S = [
        [ 7, 12, 17, 22 ], [ 5,  9, 14, 20 ], [ 4, 11, 16, 23 ], [ 6, 10, 15, 21 ]
    ];

    var T = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
        0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
        0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
        0xd9d4d039, 0xe6db99e5, 1873313359, 0xefbe4786
    ];

    var L = [ 0, 1, 5, 3, 7 ];

    var M = [ 1, 0, 1, 1, 1 ];

    var R = [ 1, 5, 3, 7, 1 ];

    var B = [ 0, 1, 1, 1, 1 ];

    var I = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];

    var F = function(x, y, z) { return (x & y) | ((~x) & z); };

    var G = function(x, y, z) { return (x & z) | (y & (~z)); };

    var H = function(x, y, z) { return x ^ y ^ z; };

    var I = function(x, y, z) { return y ^ (x | (~z)); };

    var FF = [ F, G, H, I ];

    var toHex = function(n) {
        var i, s = "";
        for (i = 0; i < 4; i++) {
            s += (
                "0123456789abcdef".charAt((n >> (i * 8 + 4)) & 0x0F) +
                "0123456789abcdef".charAt((n >> (i * 8)) & 0x0F)
            );
        }
        return s;
    };

    var rot = function(x, s) {
        return (x << s) | (x >>> (32 - s));
    };

    var add = function(x, y) {
        return (x + y) & 0xFFFFFFFF;
    }

    return function(text) {
        var i, j, k, l, m, n, len;
        var w = [];
        var h = [ 1732584193, -271733879, -1732584194, 271733878 ];

        var d = [];
        for (i = 0, len = text.length; i < len; i++) {
            d[i >> 2] |= text.charCodeAt(i) << ((i % 4) << 3);
        }

        for (i = 0, len = text.length; i < len; i++) {
            m = (i >> 2);
            n = (i % 4) * 8;
            w[m] = (w[m] | text.charCodeAt(i) << n);
        }
        w[i >> 2] |= 0x80 << ((i % 4) * 8);
        w[(((i + 8) >> 6) << 4) + 14] = i * 8;

        for (k = 0, len = w.length; k < len; k += 16) {
            var h0 = h[0], h1 = h[1], h2 = h[2], h3 = h[3];
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 16; j++) {
                    l = B[i] * j + L[i];
                    m = M[i];
                    if (m != 0) {
                        l = (l + R[i] * j) % 16;
                    }
                    var f = FF[i](h0, h1, h2);
                    var d = w[k + l];
                    var t = T[i * 16 + j];
                    var s = S[i][j % 4];
                    var tmp = add(add(add(f, d), t), h3);
                    h3 = h2;
                    h2 = h1;
                    h1 = add(h0, rot(tmp, s));
                    h0 = tmp;
                }
            }
            h[0] = add(h[0], h0);
            h[1] = add(h[1], h1);
            h[2] = add(h[2], h2);
            h[3] = add(h[3], h3);
        }
        var r = "";
        for (i = 0; i < 4; i++) {
            r += toHex(h[i]);
        }
        return r;
    };
})();
    const loadingIndicator = document.getElementById('loading-message');
    const searchBar = document.getElementById('search-bar');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const modalClose = document.querySelector('.close-button');

    const homeButton = document.querySelector('header h1');
    const gamesListButton = document.getElementById('nav-games-list');
    const helpButton = document.getElementById('nav-help');

    let allGames = [];
    let gamesLoaded = false;

    function showPage(page) {
        homePage.style.display = 'none';
        gamesListPage.style.display = 'none';
        helpPage.style.display = 'none';
        page.style.display = 'block';
    }

    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'post-card';

        const title = document.createElement('h3');
        title.textContent = game.name; // Use game name for title
        card.appendChild(title);

        const content = document.createElement('p');
        content.className = 'post-content';
        // Create a description from other game data
        content.textContent = `${game.releaseName}\nSize: ${game.sizeMB} MB`;
        card.appendChild(content);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download-btn';
        downloadButton.onclick = () => {
            

            if (!rookieBaseUrl) {
                rookieBaseUrl = prompt('Please enter the Rookie Base URL for downloads (e.g., https://example.com):');
                if (rookieBaseUrl) {
                    localStorage.setItem('rookieBaseUrl', rookieBaseUrl);
                } else {
                    alert('Download cancelled. A Base URL is required.');
                    return;
                }
            }

            const releaseNameWithNewLine = game.releaseName + '\n';
            const gameHash = md5(releaseNameWithNewLine);
            const downloadUrl = `${rookieBaseUrl}/${gameHash}/`;
            
            console.log(`Constructed URL: ${downloadUrl}`);
            window.open(downloadUrl, '_blank');
        };
        card.appendChild(downloadButton);

        // Stop propagation to prevent modal from opening when download button is clicked
        downloadButton.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        card.addEventListener('click', () => {
            // Populate the modal with game details without overwriting the close button
            modalTitle.textContent = game.name;
            modalDescription.innerHTML = `<p><strong>Release:</strong> ${game.releaseName}</p>
                                          <p><strong>Package:</strong> ${game.packageName}</p>
                                          <p><strong>Size:</strong> ${game.sizeMB} MB</p>
                                          <p><strong>Rating:</strong> ${game.rating}% (${game.ratingCount} ratings)</p>`;
            modalDate.textContent = `Last Updated: ${game.lastUpdated}`;
            modal.style.display = 'block';
        });

        return card;
    }

    function displayGames(games) {
        postsContainer.innerHTML = '';
        games.forEach(game => {
            const card = createGameCard(game);
            postsContainer.appendChild(card);
        });
    }

    async function fetchGames() {
        if (gamesLoaded) return;

        loadingIndicator.style.display = 'block';
        postsContainer.innerHTML = '';

        try {
            const response = await fetch('/VRP-GameList.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            const lines = data.trim().split('\n');
            const headers = lines.shift().split(';'); // Remove header row

            allGames = lines.map(line => {
                const values = line.split(';');
                return {
                    name: values[0],
                    releaseName: values[1],
                    packageName: values[2],
                    versionCode: values[3],
                    lastUpdated: values[4],
                    sizeMB: values[5],
                    downloads: values[6],
                    rating: values[7],
                    ratingCount: values[8]
                };
            });

            displayGames(allGames);
            gamesLoaded = true;
        } catch (error) {
            console.error('Fetch error:', error);
            postsContainer.innerHTML = '<p>Error loading games. Please make sure VRP-GameList.txt is in the correct folder.</p>';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = allGames.filter(game =>
            game.name.toLowerCase().includes(searchTerm) ||
            game.releaseName.toLowerCase().includes(searchTerm)
        );
        displayGames(filteredGames);
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    homeButton.addEventListener('click', () => showPage(homePage));
    gamesListButton.addEventListener('click', () => {
        showPage(gamesListPage);
        fetchGames();
    });
    helpButton.addEventListener('click', () => showPage(helpPage));

    // Show home page by default
    showPage(homePage);
});
