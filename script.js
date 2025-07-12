document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const searchBar = document.getElementById('search-bar');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const closeButton = document.querySelector('.close-button');

    let allPosts = []; // To store all fetched posts

    const displayError = (message) => {
        postsContainer.innerHTML = `<div class="error">${message}</div>`;
    };

    // Function to convert URLs in text to clickable links
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
        card.dataset.id = post.id; // Store post id for filtering

        const title = document.createElement('h2');
        title.textContent = post.title;

        const description = document.createElement('p');
        description.textContent = post.description || 'No description provided.';
        if (!post.description) {
            description.style.fontStyle = 'italic';
        }

        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = new Date(post.createdAt).toLocaleDateString();

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(date);

        // Add click listener to open the modal
        card.addEventListener('click', () => openModal(post));

        return card;
    };

    const renderPosts = (posts) => {
        postsContainer.innerHTML = ''; // Clear existing posts
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="loading">No matching posts found.</div>';
            return;
        }
        posts.forEach(post => {
            const card = createPostCard(post);
            postsContainer.appendChild(card);
        });
    };

    // Fetch posts from the Netlify function
    fetch('/.netlify/functions/fetch-posts')
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(`Network error: ${response.status} - ${err.error || 'Unknown error'}`) });
            }
            return response.json();
        })
        .then(posts => {
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

    // Event listener for the search bar
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length >= 2 || searchTerm.length === 0) {
            const filteredPosts = allPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm)
            );
            renderPosts(filteredPosts);
        }
    });

    // Event listeners for closing the modal
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Only close if clicking on the overlay itself
            closeModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});
