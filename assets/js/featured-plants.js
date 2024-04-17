function displayRandomPlants() {
    //Query all plants with edible roots, stem, leaves, flowers, fruits and seeds:

    const apiUrl = `https://trefle.io/api/v1/plants?filter[edible_part]=roots,stem,leaves,flowers,fruits,seeds
                    &order[seed]=random&token=${apiKey}`;
    // Fetch random plants from the Trefle API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Display a subset of random plants as featured plants
        const featuredPlants = data.data.slice(0, 5); // Displaying 5 random plants
        featuredPlants.forEach(search => {
          // Create HTML elements to display plant data
          const plantElement = document.createElement('div');
          plantElement.classList.add('bg-white', 'rounded', 'overflow-hidden', 'shadow-md', 'mb-4');
           // Create a div element for the content
           const contentDiv = document.createElement('div');
           contentDiv.classList.add('px-6', 'py-4');
        
          const imageElement = document.createElement('img');
          imageElement.classList.add('plant_img');
          imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
          imageElement.alt = search.common_name || 'Plant Image';
          imageElement.classList.add('w-full1');         
      
          contentDiv.appendChild(imageElement);
         
          // Create a heading element for the plant name
          const headingElement = document.createElement('h4');
          headingElement.textContent = "Plant Name: "+search.common_name || 'Unknown';
          headingElement.classList.add('font-bold', 'mb-2');
          contentDiv.appendChild(headingElement);
      
          // Create a paragraph element for the plant species
          const speciesParagraph = document.createElement('p');
          speciesParagraph.textContent = "Scientific Name: " +search.scientific_name || 'Unknown species';
          speciesParagraph.classList.add('text-gray-900', 'text-base');
          contentDiv.appendChild(speciesParagraph);
           
         
          // Create a link element for the plant description
          const descriptionLinkElement = document.createElement('a');
          descriptionLinkElement.setAttribute('href', `${profile_page_url}?q=`+ search.id); // Set the href attribute
          descriptionLinkElement.setAttribute('target', '_blank');
          descriptionLinkElement.textContent = 'View Description';
          contentDiv.appendChild(descriptionLinkElement);
      
          // Append plant element to the DOM
          plantElement.appendChild(contentDiv);
          document.getElementById('featuredPlants').appendChild(plantElement);
        });
      })
      .catch(error => {
        console.error('Error fetching random plants:', error);
      });
  }
  
