
// Function to render recent searches on the page
function renderRecentSearches() {
    const recentSearchesContainer = document.querySelector('.recentSearches');
    recentSearchesContainer.innerHTML = ''; // Clear previous recent searches
    
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.forEach(search => {
        
        const searchElement = document.createElement('div');
        searchElement.classList.add('mb-4');
    
        // Create an image element for the plant image
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('plant_image','box-content', 'h-12', 'w-12', 'mr-2');
        const imageElement = document.createElement('img');
        imageElement.classList.add('plant_img');
        imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
        imageElement.alt = search.common_name || 'Plant Image';
        imageElement.classList.add('w-screen');
        imgDiv.appendChild(imageElement);
        searchElement.appendChild(imgDiv);
    
        // Create a div element for the content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('flex', 'items-center', 'mb-4', 'overflow-hidden', 'rounded', 'bg-slate-50', 'hover:bg-slate-100');
        contentDiv.appendChild(imgDiv);

        // Create a heading element for the plant name
        const headingElement = document.createElement('h4');
        headingElement.textContent = search.common_name || 'Unknown';
        headingElement.classList.add('font-bold', 'mr-2');
        contentDiv.appendChild(headingElement);
    
        // Create a paragraph element for the plant species
        const speciesParagraph = document.createElement('p');
        speciesParagraph.textContent = search.scientific_name || 'Unknown species';
        speciesParagraph.classList.add('text-slate-300', 'grow');
        contentDiv.appendChild(speciesParagraph);

        // Create a link element for the plant description
        
        const descriptionLinkElement = document.createElement('a');
        descriptionLinkElement.setAttribute('href',profile_page_url); // Set the href attribute
        descriptionLinkElement.setAttribute('target', '_blank');
        descriptionLinkElement.textContent = 'View';
        descriptionLinkElement.classList.add('text-green-500', 'px-4', 'py-2');
        contentDiv.appendChild(descriptionLinkElement);
    
        searchElement.appendChild(contentDiv);
      recentSearchesContainer.appendChild(searchElement);
    });
  }

  
// Function to handle search button click ;it will displayed current search on page and add current search to recent
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

// Function to close the search modal
function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.add('hidden');
    
}