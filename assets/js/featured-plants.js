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
          plantElement.classList.add('bg-white', 'rounded', 'overflow-hidden', 'mb-4', 'p-2', 'rounded-2xl', 'drop-shadow-sm', 'transition-transform', 'transform-gpu', 'hover:scale-105');
           // Create a div element for the content
           const contentDiv = document.createElement('div');
           
        
          const imageElement = document.createElement('img');
          imageElement.classList.add('plant_img');
          imageElement.src = search.image_url || 'assets/images/placeholder.png'; // Use a placeholder image if image_url is not available
          imageElement.alt = search.common_name || 'Plant Image';
          imageElement.classList.add('w-72', 'h-52', 'rounded-lg');         
      
          contentDiv.appendChild(imageElement);
         
          // Create a heading element for the plant name
          const headingElement = document.createElement('h4');
          headingElement.textContent = search.common_name || 'Unknown';
          headingElement.classList.add('font-bold', 'mt-3', 'ml-1');
          contentDiv.appendChild(headingElement);
      
          // Create a paragraph element for the plant species
          const speciesParagraph = document.createElement('p');
          speciesParagraph.textContent = search.scientific_name || 'Unknown species';
          speciesParagraph.classList.add('text-slate-300', 'text-base', 'mb-3', 'ml-1');
          contentDiv.appendChild(speciesParagraph);
           
         
          // Create a link element for the plant description
          const descriptionLinkElement = document.createElement('a');
          descriptionLinkElement.setAttribute('href', `${profile_page_url}?q=`+ search.id); // Set the href attribute
          descriptionLinkElement.setAttribute('target', '_blank');
          descriptionLinkElement.textContent = 'View';
          descriptionLinkElement.classList.add('text-green-500', 'ml-1');
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
  
