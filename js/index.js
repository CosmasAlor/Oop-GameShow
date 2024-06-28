

// // const apiKey = 'e8c83e770cmsh8041142fbb16526p1d188cjsn2a10855c6e37';
// // const menuItems = document.querySelectorAll('.nav-link');
// // let category = 'SAILING'; // Initial category value

// // function setActiveMenuItem() {
// //     menuItems.forEach(item => {
// //         if (item.textContent.trim().toUpperCase() === category.toUpperCase()) {
// //             item.classList.add('active');
// //         } else {
// //             item.classList.remove('active');
// //         }
// //     });
// // }

// // async function fetchGamesByCategory(category) {
// //     const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
// //     const options = {
// //         method: 'GET',
// //         headers: {
// //             'x-rapidapi-key': apiKey,
// //             'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
// //         }
// //     };


// //     try {
// //         const response = await fetch(url, options);
// //         if (!response.ok) {
// //             throw new Error('Failed to fetch games');
// //         }
// //         const gamesData = await response.json();
// //         console.log(gamesData);
// //         displayGames(gamesData);
// //     } catch (error) {
// //         console.error('Error fetching games:', error);
// //     }
// // }


// function displayGames(games) {
//     const displayContainer = document.querySelector('.display');
//     let cartoona = '';

//     games.forEach(game => {
//         cartoona += `
        
//             <div class="col-lg-3">
//                 <div class="card h-100">
//                     <input type="hidden" class="game-id" value="${game.id}" />
//                     <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
//                     <div class="card-body">
//                         <h5 class="card-title">${game.title}</h5>
//                         <p class="card-text">${game.short_description}</p>
//                     </div>
//                     <div class="m-2">
//                         <button class="btn btn-primary w-100 detail-btn">Details</button>
//                     </div>
//                     <div class="card-footer text-dark d-flex justify-content-between">
//                         <div class="badge badge-secondary bg-dark">${game.genre}</div>
//                         <div class="badge badge-secondary bg-dark">${game.platform}</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     });

//     displayContainer.innerHTML = cartoona;

//     // Add event listener to each Details button
//     const detailButtons = document.querySelectorAll('.detail-btn');
//     detailButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const gameId = this.closest('.card').querySelector('.game-id').value;
//             fetchGameDetails(gameId);
//         });
//     });
// }

// async function fetchGameDetails(gameId) {
//     const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': apiKey,
//             'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error('Failed to fetch game details');
//         }
//         const gameDetails = await response.json();
//         displayGameDetails(gameDetails);
//     } catch (error) {
//         console.error('Error fetching game details:', error);
//     }
// }

// function displayGameDetails(details) {
//     const id = details.id;

//     let container = `
//     <div class="close d-flex justify-content-end p-5">
//     <button class="btn btn-close"></button>
//         <div class="close d-flex justify-content-end p-5"></div>
        
//         <div class="row">
        
//             <div class="col-4">
//                 <div class="img">
//                     <img src="${details.thumbnail}" alt="${details.title}">
//                 </div>
//             </div>
//             <div class="col-8">
//                 <div class="details">
//                     <h3>${details.title}</h3>
//                     <p>Category: <span class="badge badge-secondary bg-dark">${details.genre}</span></p>
//                     <p>Platform: <span class="badge badge-secondary bg-dark">${details.platform}</span></p>
//                     <p>Status: <span class="badge badge-secondary bg-dark">${details.status}</span></p>
//                     <div class="lead">${details.description}</div>
//                     <button class="btn btn-outline-warning">Show Game</button>
//                 </div>
//             </div>
//         </div>
//     `;

//     const content = document.getElementById("content");
//     content.innerHTML = container;
//     content.classList.remove("d-none");

//     // Close button event listener
//     const closeButton = content.querySelector('.btn-close');
//     closeButton.addEventListener('click', function() {
//         content.classList.add("d-none");
//     });
// }

// // Initial fetch and display
// fetchGamesByCategory(category);
// setActiveMenuItem();

// // Menu item click event listeners
// menuItems.forEach(item => {
//     item.addEventListener('click', function() {
//         category = this.textContent.trim().toUpperCase();
//         fetchGamesByCategory(category);
//         setActiveMenuItem();
//     });
// });


// index.js

import { fetchGamesByCategory } from './games.js';
import { displayGames, setActiveMenuItem } from './ui.js';
import { fetchGameDetails, displayGameDetails } from './details.js';

const menuItems = document.querySelectorAll('.nav-link');
let category = 'SAILING'; // Initial category value

// Initial fetch and display
fetchGamesByCategory(category).then(games => {
    displayGames(games);
    setActiveMenuItem(category);
}).catch(error => {
    console.error('Error initializing:', error);
});

// Menu item click event listeners
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

// Detail button click event listener (delegated from ui.js)
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

