document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const gamesListPage = document.getElementById('games-list-page');
    const helpPage = document.getElementById('help-page');
    const postsContainer = document.getElementById('posts-container');
const rookieBaseUrl = 'https://skrazzle.glomtom.cyou';

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(e){var r,t;if(e==null)e="";var n=function(e,r){return e<<r|e>>>32-r},o=function(e,r,t,o,a,d){return c(n(i(c(c(r,e),c(o,d)),a),t),16)},a=function(e,r,t,o,a,d,i){return c(n(s(c(c(r,e),c(o,d)),a),t),i)},d=function(e,r,t,o,a,d,i){return c(n(u(c(c(r,e),c(o,d)),a),t),i)},i=function(e,r){return e+r},s=function(e,r){return e|r},u=function(e,r){return e^r},l=function(e){for(var r=1732584193,t=-271733879,o=-1732584194,a=271733878,d=0;d<e.length;d+=16){var i=r,s=t,u=o,l=a;r=c(r,g(t,o,a)+e[d+0]+-680876936),a=c(a,g(r,t,o)+e[d+1]+-389564586),o=c(o,g(a,r,t)+e[d+2]+606105819),t=c(t,g(o,a,r)+e[d+3]+-1044525330),r=c(r,g(t,o,a)+e[d+4]+-176418897),a=c(a,g(r,t,o)+e[d+5]+1200080426),o=c(o,g(a,r,t)+e[d+6]+-1473231341),t=c(t,g(o,a,r)+e[d+7]+-45705983),r=c(r,g(t,o,a)+e[d+8]+1770035416),a=c(a,g(r,t,o)+e[d+9]+-1958414417),o=c(o,g(a,r,t)+e[d+10]+-42063),t=c(t,g(o,a,r)+e[d+11]+-1990404162),r=c(r,g(t,o,a)+e[d+12]+1804603682),a=c(a,g(r,t,o)+e[d+13]+-40341101),o=c(o,g(a,r,t)+e[d+14]+-1502002290),t=c(t,g(o,a,r)+e[d+15]+1236535329),r=c(r,p(t,o,a)+e[d+1]+-165796510),a=c(a,p(r,t,o)+e[d+6]+-1069501632),o=c(o,p(a,r,t)+e[d+11]+643717713),t=c(t,p(o,a,r)+e[d+0]+-373897302),r=c(r,p(t,o,a)+e[d+5]+-701558691),a=c(a,p(r,t,o)+e[d+10]+38016083),o=c(o,p(a,r,t)+e[d+15]+-660478335),t=c(t,p(o,a,r)+e[d+4]+-405537848),r=c(r,p(t,o,a)+e[d+9]+568446438),a=c(a,p(r,t,o)+e[d+14]+-1019803690),o=c(o,p(a,r,t)+e[d+3]+-187363961),t=c(t,p(o,a,r)+e[d+8]+1163531501),r=c(r,p(t,o,a)+e[d+13]+-1444681467),a=c(a,p(r,t,o)+e[d+2]+-51403784),o=c(o,p(a,r,t)+e[d+7]+1735328473),t=c(t,p(o,a,r)+e[d+12]+-1926607734),r=c(r,h(t,o,a)+e[d+5]+-378558),a=c(a,h(r,t,o)+e[d+8]+-2022574463),o=c(o,h(a,r,t)+e[d+11]+1839030562),t=c(t,h(o,a,r)+e[d+14]+-35309556),r=c(r,h(t,o,a)+e[d+1]+-1530992060),a=c(a,h(r,t,o)+e[d+4]+1272893353),o=c(o,h(a,r,t)+e[d+7]+-155497632),t=c(t,h(o,a,r)+e[d+10]+-1094730640),r=c(r,h(t,o,a)+e[d+13]+681279174),a=c(a,h(r,t,o)+e[d+0]+-358537222),o=c(o,h(a,r,t)+e[d+3]+-722521979),t=c(t,h(o,a,r)+e[d+6]+76029189),r=c(r,h(t,o,a)+e[d+9]+-640364487),a=c(a,h(r,t,o)+e[d+12]+-421815835),o=c(o,h(a,r,t)+e[d+15]+530742520),t=c(t,h(o,a,r)+e[d+2]+-995338651),r=c(r,m(t,o,a)+e[d+0]+-198630844),a=c(a,m(r,t,o)+e[d+7]+1126891415),o=c(o,m(a,r,t)+e[d+14]+-1416354905),t=c(t,m(o,a,r)+e[d+5]+-57434055),r=c(r,m(t,o,a)+e[d+12]+1700485571),a=c(a,m(r,t,o)+e[d+3]+-1894986606),o=c(o,m(a,r,t)+e[d+10]+-1051523),t=c(t,m(o,a,r)+e[d+1]+-2054922799),r=c(r,m(t,o,a)+e[d+8]+1873313359),a=c(a,m(r,t,o)+e[d+15]+-30611744),o=c(o,m(a,r,t)+e[d+6]+-1560198380),t=c(t,m(o,a,r)+e[d+13]+1309151649),r=c(r,m(t,o,a)+e[d+4]+-140323850),a=c(a,m(r,t,o)+e[d+11]+-175002202),o=c(o,m(a,r,t)+e[d+2]+718787259),t=c(t,m(o,a,r)+e[d+9]+-343485551),r=i(r,i),t=i(t,s),o=i(o,u),a=i(a,l)}return[r,t,o,a]},c=function(e,r){var t=(65535&e)+(65535&r);return(e>>16)+(r>>16)+(t>>16)<<16|65535&t},g=function(e,r,t){return e&r|~e&t},p=function(e,r,t){return e&t|r&~t},h=function(e,r,t){return e^r^t},m=function(e,r,t){return r^(e|~t)},f=function(e){var r,t=[];for(t[(e.length>>2)-1]=void 0,r=0;r<t.length;r+=1)t[r]=0;for(r=0;r<8*e.length;r+=8)t[r>>5]|=(255&e.charCodeAt(r/8))<<r%32;return t},v=function(e){var r,t="";for(r=0;r<32*e.length;r+=8)t+=String.fromCharCode(e[r>>5]>>>r%32&255);return t},y=function(e){var r,t="0123456789abcdef",o="";for(r=0;r<e.length;r+=1)o+=t.charAt(e[r]>>4&15)+t.charAt(15&e[r]);return o},b=function(e){return v(l(f(e)))};return t="hello",r=y(b(t)),y(l(f(e),8*e.length))};
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

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

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
