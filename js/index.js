
// index.js

import { fetchGamesByCategory } from './games.js';
import { displayGames, setActiveMenuItem } from './ui.js';
import { fetchGameDetails, displayGameDetails } from './details.js';

const menuItems = document.querySelectorAll('.nav-link');
let category = 'SAILING'; // Initial category value

fetchGamesByCategory(category).then(games => {
    displayGames(games);
    setActiveMenuItem(category);
}).catch(error => {
    console.error('Error initializing:', error);
});

menuItems.forEach(item => {
    item.addEventListener('click', async function() {
        category = this.textContent.trim().toUpperCase();
        try {
            const games = await fetchGamesByCategory(category);
            displayGames(games);
            setActiveMenuItem(category);
        } catch (error) {
            console.error('Error fetching and displaying games:', error);
        }
    });
});


document.querySelector('.display').addEventListener('click', async function(event) {
    if (event.target.classList.contains('detail-btn')) {
        const gameId = event.target.closest('.card').querySelector('.game-id').value;
        try {
            const gameDetails = await fetchGameDetails(gameId);
            displayGameDetails(gameDetails);
        } catch (error) {
            console.error('Error fetching and displaying game details:', error);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

