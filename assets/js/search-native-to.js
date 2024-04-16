const recentNativeSearches = document.getElementById('recentNativeSearches');

// Function to handle search by native-to region with pagination
function searchByNativeTo(page = 1, perPage = 5) {
    const nativeToInputValue = document.getElementById('nativeToInput').value.trim();
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
        closeSearchModal(); // Assuming you have a function to close the modal
        // Display recent native searches on the page
        displayRecentNativeSearches(results.slice(0, 5)); // Display only the current search
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
        plantElement.classList.add('bg-white', 'rounded', 'overflow-hidden', 'shadow-md', 'mb-4');
    
        // Create container for text content
    const textContainer = document.createElement('div');
    textContainer.classList.add('px-6', 'py-4');
        // Create image element
        const imageElement = document.createElement('img');
        imageElement.classList.add('plant_img');
        imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
        imageElement.alt = search.common_name || 'Plant Image';
        imageElement.classList.add('w-full1');         
    
        textContainer.appendChild(imageElement);
       
        // Create a heading element for the plant name
        const headingElement = document.createElement('h4');
        headingElement.textContent = "Plant Name: "+search.common_name || 'Unknown';
        headingElement.classList.add('font-bold', 'mb-2');
        textContainer.appendChild(headingElement);
    
        // Create a paragraph element for the plant species
        const speciesParagraph = document.createElement('p');
        speciesParagraph.textContent = "Scientific Name: " +search.scientific_name || 'Unknown species';
        speciesParagraph.classList.add('text-gray-900', 'text-base');
        textContainer.appendChild(speciesParagraph);

        // Create a link element for the plant description
        const descriptionLinkElement = document.createElement('a');
        descriptionLinkElement.setAttribute('href', profile_page_url); // Set the href attribute
        descriptionLinkElement.setAttribute('target', '_blank'); // Open link in a new tab
        descriptionLinkElement.textContent = 'View Description';
        textContainer.appendChild(descriptionLinkElement);
        
   
    textContainer.appendChild(speciesParagraph);
    textContainer.appendChild(imageElement);
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
  