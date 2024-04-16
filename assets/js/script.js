const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
// Find the button element to open the search modal
const openSearchModalBtn = document.getElementById('openSearchModalBtn');
// Find the search modal element
const searchModal = document.getElementById('searchModal');
const apiKey = '78aQpYXBfK1qA-PfQLjm31iylf5x_PaXcdCcdmvHeTM'; // Trefle API key
const baseURL = window.location.protocol + '//' + window.location.hostname;
const profile_page_url ='./plant-profile.html';
const closeModalBtn = document.getElementById('closeModalBtn');


// Function to fetch search results from Trefle API
async function searchPlants(query) {
    
    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${query}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const results = data.data || []; // Extract the results from data.data
      return results; // Return search results
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return empty array in case of error
    }
}
  
  // Function to display search text-box suggestions
function displaySuggestions(suggestions) {
    const plantNameHints = document.getElementById('plantNameHints');
    plantNameHints.innerHTML = ''; // Clear previous search hints
    
    if (suggestions.length === 0) {
      plantNameHints.innerHTML = '<p>No suggestions found.</p>';
      return;
    }
    
    suggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion', 'py-1', 'px-2', 'hover:bg-slate-100', 'rounded');
      suggestionElement.textContent = suggestion.common_name || suggestion.scientific_name || 'Unknown';
      suggestionElement.addEventListener('click', function() {
        // Set the selected suggestion as the value of the search input field
        searchInput.value = suggestion.common_name || suggestion.scientific_name || '';
              // Save the selected suggestion to local storage
        localStorage.setItem('currentSearch', JSON.stringify(suggestion));
        // Clear the suggestions
        plantNameHints.innerHTML = '';
      });
      plantNameHints.appendChild(suggestionElement);
    });
  }
 
  // Add input event listener for the search input field
searchInput.addEventListener('input', async function() {
    const query = this.value.trim();
     if (query.length === 0) {
      document.getElementById('plantNameHints').innerHTML = ''; // Clear suggestions if query is empty
      return;
    }
    
    const results = await searchPlants(query);
    const plantData = results.map(plant => ({ 
      common_name: plant.common_name, 
      scientific_name: plant.scientific_name,
      image_url: plant.image_url,
      links: plant.links.plant,
     }));
     
    displaySuggestions(plantData);
});
  
// Add a click event listener to open the search modal button
openSearchModalBtn.addEventListener('click', function() {
  // Remove the 'hidden' class from the search modal to show it
  searchModal.classList.remove('hidden');
});

// Add click event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Close the modal when clicking the close button
closeModalBtn.addEventListener('click', closeSearchModal);

document.addEventListener('DOMContentLoaded', renderRecentSearches);