// Fetch a random dad joke from the API
async function fetchRandomJoke() {
    const jokeText = document.getElementById('joke-text');
    const button = document.getElementById('next-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    try {
        button.disabled = true;
        loadingIndicator.style.display = 'block';
        
        // Using direct fetch without CORS proxy first
        const response = await fetch('https://icanhazdadjoke.com/?format=json', {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        jokeText.textContent = data.joke;
        
        loadingIndicator.style.display = 'none';
        button.disabled = false;
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeText.textContent = "Oops! Couldn't fetch a joke right now. Try again!";
        loadingIndicator.style.display = 'none';
        button.disabled = false;
    }
}

// Display the joke and date on page load
function displayInitialJoke() {
    const today = new Date();
    document.getElementById('date-display').textContent = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    fetchRandomJoke();
}

// Event listener for button
document.getElementById('next-button').addEventListener('click', fetchRandomJoke);

// Load joke on page load
document.addEventListener('DOMContentLoaded', displayInitialJoke);
