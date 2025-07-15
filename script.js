document.addEventListener('DOMContentLoaded', () => {
    // Page elements
    const homePage = document.getElementById('home-page');
    const gamesListPage = document.getElementById('games-list-page');
    const helpPage = document.getElementById('help-page');

    // Navigation buttons
    const navGamesList = document.getElementById('nav-games-list');
    const navHelp = document.getElementById('nav-help');
    const homeButton = document.querySelector('header h1');

    // Games list elements
    const postsContainer = document.getElementById('posts-container');
    const searchBar = document.getElementById('search-bar');
    const loadingMessage = document.getElementById('loading-message');

    // Modal elements
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const closeButton = document.querySelector('.close-button');

    let allPosts = [];
    let postsLoaded = false;

    const showPage = (pageId) => {
        homePage.classList.add('hidden');
        gamesListPage.classList.add('hidden');
        helpPage.classList.add('hidden');
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }
    };

    const displayError = (message) => {
        postsContainer.innerHTML = `<div class="error">${message}</div>`;
        loadingMessage.style.display = 'none';
    };

    const linkify = (text) => {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    };

    const openModal = (post) => {
        modalTitle.textContent = post.title;
        modalDescription.innerHTML = linkify(post.description || 'No description provided.');
        modalDate.textContent = new Date(post.createdAt).toLocaleDateString();
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    const createPostCard = (post) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => openModal(post));

        const title = document.createElement('h2');
        title.textContent = post.title;

        const description = document.createElement('p');
        description.textContent = post.description || 'No description provided.';
        if (!post.description) description.style.fontStyle = 'italic';

        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = new Date(post.createdAt).toLocaleDateString();

        card.append(title, description, date);
        return card;
    };

    const renderPosts = (posts) => {
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="loading">No matching posts found.</div>';
            return;
        }
        posts.forEach(post => {
            const card = createPostCard(post);
            postsContainer.appendChild(card);
        });
    };

    const fetchGames = () => {
        if (postsLoaded) return;
        postsLoaded = true;
        loadingMessage.style.display = 'block';

        fetch('/.netlify/functions/fetch-posts')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(`Network error: ${response.status} - ${err.error || 'Unknown error'}`) });
                }
                return response.json();
            })
            .then(posts => {
                loadingMessage.style.display = 'none';
                if (posts.error) {
                    console.error('Error from function:', posts.details);
                    displayError(`Error fetching posts: ${posts.error}`);
                    return;
                }
                allPosts = posts;
                renderPosts(allPosts);
            })
            .catch(error => {
                console.error('Failed to fetch posts:', error);
                displayError('Could not load posts. Please check the console for more details.');
            });
    };

    // --- Event Listeners ---

    navGamesList.addEventListener('click', () => {
        showPage('games-list-page');
        fetchGames();
    });

    navHelp.addEventListener('click', () => {
        showPage('help-page');
    });

    homeButton.addEventListener('click', () => {
        showPage('home-page');
    });

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm)
        );
        renderPosts(filteredPosts);
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // Show home page by default
    showPage('home-page');
});
