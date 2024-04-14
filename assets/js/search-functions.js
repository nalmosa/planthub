
// Function to render recent searches on the page
function renderRecentSearches() {
    const recentSearchesContainer = document.querySelector('.recentSearches');
    recentSearchesContainer.innerHTML = ''; // Clear previous recent searches
    
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.forEach(search => {
        const searchElement = document.createElement('div');
        searchElement.classList.add('bg-white', 'rounded', 'overflow-hidden', 'shadow-md', 'mb-4');
    
        // Create an image element for the plant image
        const imageElement = document.createElement('img');
        imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
        imageElement.alt = search.common_name || 'Plant Image';
        imageElement.classList.add('w-full1');
        searchElement.appendChild(imageElement);
    
        // Create a div element for the content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('px-6', 'py-4');
    
        // Create a heading element for the plant name
        const headingElement = document.createElement('h4');
        headingElement.textContent = search.common_name || 'Unknown';
        headingElement.classList.add('font-bold', 'mb-2');
        contentDiv.appendChild(headingElement);
    
        // Create a paragraph element for the plant species
        const speciesParagraph = document.createElement('p');
        speciesParagraph.textContent = search.scientific_name || 'Unknown species';
        speciesParagraph.classList.add('text-gray-900', 'text-base');
        contentDiv.appendChild(speciesParagraph);
    
        searchElement.appendChild(contentDiv);
      recentSearchesContainer.appendChild(searchElement);
    });
  }
    
  // Call renderRecentSearchesModal() when the page is loaded
//   window.addEventListener('DOMContentLoaded', function() {
//     //renderRecentSearchesModel();
//   });
  
// Function to handle search button click
function handleSearch() {
  const currentSearch = JSON.parse(localStorage.getItem('currentSearch'));
  if (currentSearch) {
    // Perform the search action here
    console.log('Searching for:', currentSearch.common_name || currentSearch.scientific_name || 'Unknown');
    // Update recent searches
    updateRecentSearches(currentSearch);
    // Clear the current search from local storage
    localStorage.removeItem('currentSearch');
    // Clear the search input field
    searchInput.value = '';
    // Close the search modal
    closeSearchModal();
    // Render recent searches on the page
    renderRecentSearches();
   // renderRecentSearchesModel();
  }
}

// Function to update recent searches in local storage
function updateRecentSearches(search) {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  recentSearches.unshift(search);
  // Limit the recent searches to a certain number (e.g., 5)
  const limitedRecentSearches = recentSearches.slice(0, 5);
  localStorage.setItem('recentSearches', JSON.stringify(limitedRecentSearches));
}


// Function to display search results
function displayResults(results) {
    const plantNameHints = document.getElementById('plantNameHints');
    plantNameHints.innerHTML = ''; // Clear previous search hints
    
    if (results.length === 0) {
      plantNameHints.innerHTML = '<p>No results found.</p>';
      return;
    }
    
    results.forEach((plant, index) => {
      if (index < 5) { // Display only the first 5 search results
        const plantElement = document.createElement('div');
        plantElement.classList.add('plant');
        plantElement.innerHTML = `
          <h3>${plant.common_name || 'Unknown'}</h3>
          <img src="${plant.image_url}" alt="${plant.common_name || 'Plant'}" class="w-16 h-16 mr-2">
          <p>${plant.scientific_name}</p>
          <p>Description: <a href="${plant.link}" target="_blank" rel="noopener noreferrer">Learn more</a></p>
        `;
        plantNameHints.appendChild(plantElement);
      }
    });
  }