const recentNativeSearches = document.getElementById('recentNativeSearches');
const nativeSearchHeading = document.getElementById('native-search-heading');

// Function to handle search by native-to region with pagination
function searchByNativeTo(page = 1, perPage = 5) {
    const nativeToInputValue = document.getElementById('nativeToInput').value.trim() || 'Amazons';
    nativeSearchHeading.textContent = `🌎 Plants introduced in ${nativeToInputValue}`;
    if (!nativeToInputValue) {
      //alert('Please enter a native-to region.');
      return;
    }
    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${nativeToInputValue}&page=${page}`;
   
        // Perform API call to search plants by native-to region with pagination
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        
        console.log('API Response:', data); // Log the API response
        const results = data.data || [];         
        // Store search results in local storage
        localStorage.setItem('nativeToSearchResults', JSON.stringify(results));
        // Close the modal after successful search
        closeSearchModal(); 
        // Display recent native searches on the page
        displayRecentNativeSearches(results.slice(0, 5)); // Display only the current search
        // Perform additional search based on distribution
        searchPlantsByDistribution(nativeToInputValue);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
// Function to search plants by distribution
function searchPlantsByDistribution(distribution) {
  const apiUrl = `https://trefle.io/api/v1/plants?filter[distributions]=${distribution}&token=${apiKey}`;
  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const plants = data.data || [];
          //displayPlantResults(plants);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
    
// Function to retrieve recent native searches from local storage
function getRecentNativeSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('nativeToSearchResults')) || [];
    return recentSearches.slice(0, 5);
}

// Function to display recent native searches on the page
function displayRecentNativeSearches(searches) {
    const recentSearchesContainer = document.getElementById('recentNativeSearches');
    recentSearchesContainer.innerHTML = ''; // Clear previous recent searches
    
    // Display recent native searches
    searches.forEach(search => {

        const plantElement = document.createElement('div');
        plantElement.classList.add('bg-white', 'rounded', 'overflow-hidden', 'mb-4', 'p-2', 'rounded-2xl', 'drop-shadow-sm', 'transition-transform', 'transform-gpu', 'hover:scale-105');
    
        // Create container for text content
       const textContainer = document.createElement('div');       

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.classList.add('plant_img');
        imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
        imageElement.alt = search.common_name || 'Plant Image';
        imageElement.classList.add('w-72', 'h-52', 'rounded-lg');         
    
        textContainer.appendChild(imageElement);
       
        // Create a heading element for the plant name
        const headingElement = document.createElement('h4');
        headingElement.textContent = search.common_name || 'Unknown';
        headingElement.classList.add('font-bold', 'ml-1', 'mt-3');
        textContainer.appendChild(headingElement);
    
        // Create a paragraph element for the plant species
        const speciesParagraph = document.createElement('p');
        speciesParagraph.textContent = search.scientific_name || 'Unknown species';
        speciesParagraph.classList.add('text-slate-300', 'text-base', 'ml-1', 'mb-3');
        textContainer.appendChild(speciesParagraph);

        // Create a link element for the plant description
        const descriptionLinkElement = document.createElement('a');
        descriptionLinkElement.setAttribute('href', `${profile_page_url}?q=`+ search.scientific_name); // Set the href attribute
        descriptionLinkElement.setAttribute('target', '_blank'); // Open link in a new tab
        descriptionLinkElement.textContent = 'View';
        descriptionLinkElement.classList.add('text-green-500',  'ml-1');
        textContainer.appendChild(descriptionLinkElement);
        
    textContainer.appendChild(imageElement);
    textContainer.appendChild(headingElement);
    textContainer.appendChild(speciesParagraph);
    textContainer.appendChild(descriptionLinkElement);
    
    
    // Append plant element to the DOM
    plantElement.appendChild(textContainer);
    recentSearchesContainer.appendChild(plantElement);

    });
  }
// Event listener for search button click for native-to region
document.getElementById('searchNativeToBtn').addEventListener('click', function() {
    searchByNativeTo(1); // Pass 1 as the default page number
  });
  


  // Call searchByNativeTo function with default parameters when the page loads
window.onload = function() {
    searchByNativeTo(1); // Pass 1 as the default page number
    const recentSearches = getRecentNativeSearches();
    displayRecentNativeSearches(recentSearches);
    displayRandomPlants();
  }
  