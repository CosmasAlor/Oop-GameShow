// games.js

const apiKey = 'e8c83e770cmsh8041142fbb16526p1d188cjsn2a10855c6e37';

export async function fetchGamesByCategory(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
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
            throw new Error('Failed to fetch games');
        }
        const gamesData = await response.json();
        return gamesData;
    } catch (error) {
        console.error('Error fetching games:', error);
        return null;
    }
}
