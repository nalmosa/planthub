// Function to render recent searches on the page
function renderRecentSearches() {
    const recentSearchesContainer = document.getElementById('recentSearches');
    recentSearchesContainer.innerHTML = ''; // Clear previous recent searches
    
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.forEach(search => {
      const searchElement = document.createElement('div');
      searchElement.textContent = search.common_name || search.scientific_name || 'Unknown';
      recentSearchesContainer.appendChild(searchElement);
    });
  }

  
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
