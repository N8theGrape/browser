// Instantiate a Fuse object
var fuse;

async function handleKeyPress(event) {
    if (event.keyCode === 13) {
        performSearch();
    }
}

async function performSearch() {
    var searchTerm = document.getElementById('searchInput').value;
    var searchResultElement = document.getElementById('searchPrompt');
    var resultListElement = document.getElementById('resultList');

    try {
        // Fetch data from the server
        var fileData = await fetchData();

        // Create a Fuse instance with the fileData and desired options
        fuse = new Fuse(fileData, {
            keys: ['content'], // Specify the keys you want to search on
            includeScore: true, // Include the search score in the results
        });

        // Perform the fuzzy search
        var results = fuse.search(searchTerm);

        if (results.length > 0) {
            // Display the number of matching results
            searchResultElement.textContent = `Found ${results.length} matching results`;

            // Display a list of matching results
            resultListElement.innerHTML = ''; // Clear previous results
            results.forEach(function (result) {
                var nameMatch = result.item.content.match(/@name: "(.*?)"/);
                var displayName = nameMatch ? nameMatch[1] : 'Unknown';
                var listItem = document.createElement('li');
                listItem.textContent = displayName + ` (Score: ${result.score.toFixed(2)})`;
                listItem.className = 'result-list-item';
                resultListElement.appendChild(listItem);
            });
        } else {
            searchResultElement.textContent = 'No matching results found.';
            resultListElement.innerHTML = ''; // Clear previous results
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultElement.textContent = 'Error fetching data.';
        resultListElement.innerHTML = ''; // Clear previous results
    }
}
