// ui.js

export function displayGames(games) {
    const displayContainer = document.querySelector('.display');
    let cartoona = '';

    games.forEach(game => {
        cartoona += `
            <div class="col-lg-3">
                <div class="card h-100">
                    <input type="hidden" class="game-id" value="${game.id}" />
                    <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                    <div class="card-body">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">${game.short_description}</p>
                    </div>
                    <div class="m-2">
                        <button class="btn btn-primary w-100 detail-btn">Details</button>
                    </div>
                    <div class="card-footer text-dark d-flex justify-content-between">
                        <div class="badge badge-secondary bg-dark">${game.genre}</div>
                        <div class="badge badge-secondary bg-dark">${game.platform}</div>
                    </div>
                </div>
            </div>
        `;
    });

    displayContainer.innerHTML = cartoona;

    // Add event listener to each Details button
    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.closest('.card').querySelector('.game-id').value;
            return gameId;  // Return the gameId to be used in details.js
        });
    });
}

export function setActiveMenuItem(category) {
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach(item => {
        if (item.textContent.trim().toUpperCase() === category.toUpperCase()) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
