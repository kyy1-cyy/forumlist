document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const gamesListPage = document.getElementById('games-list-page');
    const helpPage = document.getElementById('help-page');
    const postsContainer = document.getElementById('posts-container');
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
