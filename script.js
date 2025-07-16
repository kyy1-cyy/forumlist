document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const gamesListPage = document.getElementById('games-list-page');
    const helpPage = document.getElementById('help-page');
    const postsContainer = document.getElementById('posts-container');

    var md5=(function(){var S=[[7,12,17,22],[5,9,14,20],[4,11,16,23],[6,10,15,21]],T=[0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,1873313359,0xefbe4786],L=[0,1,5,3,7],M=[1,0,1,1,1],R=[1,5,3,7,1],B=[0,1,1,1,1],I=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],F=function(x,y,z){return(x&y)|((~x)&z)},G=function(x,y,z){return(x&z)|(y&(~z))},H=function(x,y,z){return x^y^z},I=function(x,y,z){return y^(x|(~z))},FF=[F,G,H,I],toHex=function(n){var i,s="";for(i=0;i<4;i++)s+="0123456789abcdef".charAt((n>>(i*8+4))&0x0F)+"0123456789abcdef".charAt((n>>(i*8))&0x0F);return s},rot=function(x,s){return(x<<s)|(x>>>(32-s))},add=function(x,y){return(x+y)&0xFFFFFFFF};return function(text){var i,j,k,l,m,n,len,w=[],h=[1732584193,-271733879,-1732584194,271733878],d=[];for(i=0,len=text.length;i<len;i++)d[i>>2]|=text.charCodeAt(i)<<(i%4<<3);for(i=0,len=text.length;i<len;i++){m=i>>2;n=(i%4)*8;w[m]=w[m]|text.charCodeAt(i)<<n}w[i>>2]|=128<<(i%4)*8;w[((i+8>>6)<<4)+14]=i*8;for(k=0,len=w.length;k<len;k+=16){var h0=h[0],h1=h[1],h2=h[2],h3=h[3];for(i=0;i<4;i++)for(j=0;j<16;j++){l=B[i]*j+L[i];m=M[i];if(m!=0)l=(l+R[i]*j)%16;var f=FF[i](h0,h1,h2),d=w[k+l],t=T[i*16+j],s=S[i][j%4],tmp=add(add(add(f,d),t),h3);h3=h2;h2=h1;h1=add(h0,rot(tmp,s));h0=tmp}h[0]=add(h[0],h0);h[1]=add(h[1],h1);h[2]=add(h[2],h2);h[3]=add(h[3],h3)}var r="";for(i=0;i<4;i++)r+=toHex(h[i]);return r}})();

    const loadingIndicator = document.getElementById('loading-message');
    const searchBar = document.getElementById('search-bar');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalDownloadBtn = document.getElementById('modal-download-btn');
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
        title.textContent = game.name;
        card.appendChild(title);

        const imageUrl = `images/${game.packageName}.jpg`;
        const placeholderUrl = 'https://placehold.co/200x200/2c2f33/e0e0e0?text=No+Image';

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = game.name; // for accessibility
        image.onerror = () => { 
            image.src = placeholderUrl; // Fallback to placeholder if image fails to load
        };
        card.appendChild(image);

        const content = document.createElement('p');
        content.className = 'post-content';
        content.textContent = `${game.releaseName}\nSize: ${game.sizeMB} MB`;
        card.appendChild(content);

        card.addEventListener('click', () => {
            modalTitle.textContent = game.name;
            modalDetails.innerHTML = `<p><strong>Release:</strong> ${game.releaseName}</p>
                                      <p><strong>Package:</strong> ${game.packageName}</p>
                                      <p><strong>Size:</strong> ${game.sizeMB} MB</p>
                                      <p><strong>Rating:</strong> ${game.rating}% (${game.ratingCount} ratings)</p>
                                      <p><strong>Last Updated:</strong> ${game.lastUpdated}</p>`;
            
            const releaseNameWithNewLine = game.releaseName + '\n';
            const gameHash = md5(releaseNameWithNewLine);
            
            const realDownloadUrl = `https://go.vrpyourself.online/${gameHash}/`;
            const redirectUrl = `https://href.li/?${realDownloadUrl}`;
            modalDownloadBtn.dataset.url = redirectUrl;

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
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.text();
            const lines = data.trim().split('\n');
            lines.shift(); // Remove header row

            allGames = lines.map(line => {
                const values = line.split(';');
                return { name: values[0], releaseName: values[1], packageName: values[2], versionCode: values[3], lastUpdated: values[4], sizeMB: values[5], downloads: values[6], rating: values[7], ratingCount: values[8] };
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

    modalDownloadBtn.addEventListener('click', (e) => {
        const url = e.currentTarget.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
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

        modal.style.display = 'none'; // Explicitly hide modal on init
    showPage(homePage);
});
