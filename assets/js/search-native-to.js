// Function to handle search by native-to region with pagination
function searchByNativeTo(pageNumber = 1, perPage = 5) {
    const nativeToInputValue = document.getElementById('nativeToInput').value.trim();
    //alert(nativeToInputValue);
    if (!nativeToInputValue) {
      //alert('Please enter a native-to region.');
      return;
    }
    const apiKey = '78aQpYXBfK1qA-PfQLjm31iylf5x_PaXcdCcdmvHeTM';    
    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${nativeToInputValue}&page=${pageNumber}&per_page=${perPage}`;
   
        // Perform API call to search plants by native-to region with pagination
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); // Log the API response
        const results = data.data || []; // Extract the results from data.data
        // Render search results on the page
        renderSearchResults(results);
        // Store search results in local storage
        localStorage.setItem('nativeToSearchResults', JSON.stringify(results));
        // Close the modal after successful search
        closeSearchModal(); // Assuming you have a function to close the modal
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  
  // Function to render search results on the page
function renderSearchResults(results) {
    // Clear previous search results
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    searchResultsContainer.innerHTML = '';
  
    // Check if results is an array
    if (!Array.isArray(results)) {
      console.error('Error: Search results is not an array.');
      return;
    }
  
    if (results.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    results.forEach(plant => {
      // Create HTML elements to display search results
      const plantElement = document.createElement('div');
      plantElement.innerHTML = `
        <h3>${plant.common_name || 'Unknown'}</h3>
        <p>Scientific Name: ${plant.scientific_name || 'Unknown'}</p>
        <p>Description: <a href="${plant.link}" target="_blank" rel="noopener noreferrer">Learn more</a></p>
      `;
      searchResultsContainer.appendChild(plantElement);
    });
  }
  
  
// Event listener for search button click for native-to region
document.getElementById('searchNativeToBtn').addEventListener('click', function() {
    searchByNativeTo(1); // Pass 1 as the default page number
  });
  


  // Call searchByNativeTo function with default parameters when the page loads
window.onload = function() {
    searchByNativeTo(1); // Pass 1 as the default page number
  }
  