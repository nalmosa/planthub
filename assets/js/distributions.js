function setupNativeToSuggestions() {
    const apiUrl = `https://trefle.io/api/v1/distributions?token=${apiKey}`;
    const nativeToInput = document.getElementById('nativeToInput');
    const suggestionsContainer = document.getElementById('DistributionsNameHints');

    // Function to fetch suggestions from the Trefle API
    function fetchSuggestions(query) {
        fetch(`${apiUrl}&q=${query}`)
            .then(response => response.json())
            .then(data => {
                const suggestions = data.data || [];
                displaySuggestions(suggestions);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    }

    // Function to display suggestions in the suggestions container
    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = suggestion.name;
            suggestionElement.addEventListener('click', () => {
                nativeToInput.value = suggestion.name;
                suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
            });
            suggestionsContainer.appendChild(suggestionElement);
        });
    }

    // Event listener for input in the native to textbox
    nativeToInput.addEventListener('input', event => {
        const query = event.target.value.trim();
        if (query.length >= 2) { // Only fetch suggestions when at least 2 characters are typed
            fetchSuggestions(query);
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if input is less than 2 characters
        }
    });

    // Event listener to trigger suggestions when clicking inside the textbox
    nativeToInput.addEventListener('focus', () => {
        fetchSuggestions('');
    });
}

// Call the function with the API URL
setupNativeToSuggestions();