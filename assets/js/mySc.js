// Function to fetch search results from Trefle API
async function searchPlants(query) {
    const apiKey = '78aQpYXBfK1qA-PfQLjm31iylf5x_PaXcdCcdmvHeTM'; // Replace 'YOUR_API_KEY' with your Trefle API key
    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${query}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.data; // Return search results
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return empty array in case of error
    }
  }
  
  // Function to display search suggestions
  function displaySuggestions(suggestions) {
    const plantNameHints = document.getElementById('plantNameHints');
    plantNameHints.innerHTML = ''; // Clear previous search hints
    
    if (suggestions.length === 0) {
      plantNameHints.innerHTML = '<p>No suggestions found.</p>';
      return;
    }
    
    suggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
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
  
//   // Function to handle search button click
//   function handleSearch() {
//     const currentSearch = JSON.parse(localStorage.getItem('currentSearch'));
//     if (currentSearch) {
//       // Perform the search action here
//       console.log('Searching for:', currentSearch.common_name || currentSearch.scientific_name || 'Unknown');
//       // Clear the current search from local storage
//       localStorage.removeItem('currentSearch');
//       // Clear the search input field
//       searchInput.value = '';
//       // Close the search modal
//       closeSearchModal();
//     }
//   }
  
  // Find the input element for searching
  const searchInput = document.getElementById('searchInput');
  
  // Add input event listener for the search input field
  searchInput.addEventListener('input', async function() {
    const query = this.value.trim();
    if (query.length === 0) {
      document.getElementById('plantNameHints').innerHTML = ''; // Clear suggestions if query is empty
      return;
    }
    
    const results = await searchPlants(query);
    const suggestions = results.map(plant => ({ common_name: plant.common_name, scientific_name: plant.scientific_name }));
    displaySuggestions(suggestions);
  });
  
  // Find the search button
  const searchButton = document.getElementById('search-btn');
  
  // Add click event listener to the search button
  searchButton.addEventListener('click', handleSearch);
  
// Function to display current search on the page
function displayCurrentSearch() {
    const currentSearch = JSON.parse(localStorage.getItem('currentSearch'));
    if (currentSearch) {
      const currentSearchElement = document.getElementById('currentSearch');
      currentSearchElement.textContent = `Current Search: ${currentSearch.common_name || currentSearch.scientific_name || 'Unknown'}`;
    }
  }
  
  // Display current search on page load
  window.addEventListener('DOMContentLoaded', function() {
    displayCurrentSearch();
  });
  

// Find the button element to open the search modal
const openSearchModalBtn = document.getElementById('openSearchModalBtn');

// Find the search modal element
const searchModal = document.getElementById('searchModal');

// Add a click event listener to open the search modal button
openSearchModalBtn.addEventListener('click', function() {
  // Remove the 'hidden' class from the search modal to show it
  searchModal.classList.remove('hidden');
});


// Function to close the search modal
function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.add('hidden');
  }
  

