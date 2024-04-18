const token = '78aQpYXBfK1qA-PfQLjm31iylf5x_PaXcdCcdmvHeTM';
const plantProfileEl = document.querySelector('#plant-profile');
const plantNameEl = document.querySelector('#plant-name');
const nativeFactEl = document.querySelector('#native');
const familyNameEl = document.querySelector('#family-name');
const averageHeightEl = document.querySelector('#average-height');
const growthRateEl = document.querySelector('#growth-rate');
const descriptionEl = document.querySelector('#plant-description');

// Get scientific name parameter
function getParam() {
    // ?q=Rosa%20multiflora
    const scientific_name = document.location.search.split('=').pop();
    // const scientific_name = decodeURIComponent(query);

    console.log(scientific_name);
    searchAPI(scientific_name);
}

function displayPlantFacts(factsData) {
    const noInfo = 'No info yet!';
    // Getting plant growth description
    const plantDescription = factsData['data']['main_species']['growth']['description'];
    // Getting average height of the plant 
    const plantSpecifications = factsData['data']['main_species']['specifications'];
    const averageHeight = plantSpecifications['average_height']['cm'];
    // Getting family common name fact
    const familyCommonName = factsData['data']['main_species']['family_common_name'];
    // Getting the native facts
    const distribution = factsData['data']['main_species']['distribution'];
    const native_to = distribution['native'];
    // Getting the growth rate of the plant
    const growthRate = factsData['data']['main_species']['specifications']['growth_rate'];


    // Print description of the plant growth if available
    // Hide element if there is no info
    if(plantDescription !== null) {
        descriptionEl.innerHTML += `<h2 class="h2 mb-3">&#127793; Description</h2>`;
        descriptionEl.innerHTML += `<p class="text-gray-400">${plantDescription}</p>`;
    }

    // Print average height of plant
    if (averageHeight === null) {
        averageHeightEl.innerHTML += `<h2 class="h2 text-center text-green-600">${noInfo}</h2>`;
    } else {
        averageHeightEl.innerHTML += `<h2 class="h2 text-center text-green-600">${averageHeight} cm</h2>`;
    }

    // Print family common name
    if (familyCommonName === null) {
        familyNameEl.innerHTML += `<h2 class="h2 text-center text-green-600">${noInfo}</h2>`;
    } else {
        familyNameEl.innerHTML += `<h2 class="h2 text-center text-green-600">${familyCommonName}</h2>`;
    }

    // Print first region from native array
    if (native_to === null) {
        nativeFactEl.innerHTML += `<h2 class="h2 text-center text-green-600">${noInfo}</h2>`;
    } else {
        nativeFactEl.innerHTML += `<h2 class="h2 text-center text-green-600">${native_to[0]}</h2>`;
    }

    // Print plant's growth rate
    if (growthRate === null) {
        growthRateEl.innerHTML += `<h2 class="h2 text-center text-green-600">${noInfo}</h2>`;
    } else {
        growthRateEl.innerHTML += `<h2 class="h2 text-center text-green-600">${growthRate}</h2>`;
    }
}

function displayPlantInformation(plantData) {
    if (plantData) {
        const plantId = plantData['data'][0]['id'];
        const url = `https://trefle.io/api/v1/plants/${plantId}?token=${token}`;

        // Creating h1 element for the common name of the plant
        const commonName = document.createElement('h1');
        commonName.classList.add('h1', 'transition-transform', 'transform-gpu', 'hover:scale-110');
        commonName.setAttribute('id', 'common-name');
        commonName.textContent = `${plantData['data'][0]['common_name']}`;

        plantNameEl.append(commonName);

        // Creating p element for the scientific name of the plant
        const scientificName = document.createElement('p');
        scientificName.classList.add('text-gray-400', 'mt-3');
        scientificName.setAttribute('id', 'species-name');
        scientificName.textContent = `${plantData['data'][0]['scientific_name']}`;

        plantNameEl.append(scientificName);

        // Creating img element for the plant image
        const plantImage = document.createElement('img');
        plantImage.classList.add('shadow-md', 'transition-transform', 'transform-gpu', 'hover:scale-110');
        plantImage.setAttribute('src', `${plantData['data'][0]['image_url']}`);
        plantImage.setAttribute('alt', `${plantData['data'][0]['common_name']}`);

        plantProfileEl.append(plantImage);

        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Error loading plant information using ID');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            displayPlantFacts(data);
        })
        .catch(error => console.error('Error:', error));
    }
}

// Search API for the plant information
function searchAPI(query) {
    const url = `https://trefle.io/api/v1/plants?token=${token}&filter[scientific_name]=${query}`;

    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Error loading plant profile information');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        displayPlantInformation(data);
    })
    .catch(error => console.error('Error:', error));
}

getParam();