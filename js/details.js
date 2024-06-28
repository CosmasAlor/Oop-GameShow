// details.js

const apiKey = 'e8c83e770cmsh8041142fbb16526p1d188cjsn2a10855c6e37';

export async function fetchGameDetails(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch game details');
        }
        const gameDetails = await response.json();
        console.log(gameDetails);
        return gameDetails;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return null;
    }
}

export function displayGameDetails(details) {
    const id = details.id;

    // Split the description into words and limit to 30 words
    let truncatedDescription = details.description.split(' ').slice(0, 100).join(' ');
    if (details.description.split(' ').length > 100) {
        truncatedDescription += '...';
    }

    let container = `
    <div class="close d-flex justify-content-end p-5">
        <button class="btn btn-close"></button>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="img">
                <img src="${details.thumbnail}" alt="${details.title}">
            </div>
        </div>
        <div class="col-8">
            <div class="details">
                <h3>${details.title}</h3>
                <p>Category: <span class="badge badge-secondary bg-dark">${details.genre}</span></p>
                <p>Platform: <span class="badge badge-secondary bg-dark">${details.platform}</span></p>
                <p>Status: <span class="badge badge-secondary bg-dark">${details.status}</span></p>
                <div class="lead p-4">${truncatedDescription}</div>
                <a href="${details.game_url}"><button class="btn btn-outline-warning">Show Game</button></a>
                
            </div>
        </div>
    </div>`;

    const content = document.getElementById("content");
    content.innerHTML = container;
    content.classList.remove("d-none");

    // Close button event listener
    const closeButton = content.querySelector('.btn-close');
    closeButton.addEventListener('click', function() {
        content.classList.add("d-none");
    });
}

