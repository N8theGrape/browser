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

        // Filter files based on the search term
        var matchingFiles = fileData.filter(function (file) {
            // Check if the file's content includes the search term within @tags
            return checkTagInContent(file.content, searchTerm);
        });

        if (matchingFiles.length > 0) {
            // Display the number of matching results
            searchResultElement.textContent = `Found ${matchingFiles.length} matching results`;

            // Display a list of matching results
            resultListElement.innerHTML = ''; // Clear previous results
            matchingFiles.forEach(function (file) {
                var nameMatch = file.content.match(/@name: "(.*?)"/);
                var displayName = nameMatch ? nameMatch[1] : 'Unknown';
                var listItem = document.createElement('li');
                listItem.textContent = displayName;
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

function checkTagInContent(content, searchTerm) {
    // Check if the file's content includes the search term within @tags
    var tagRegex = new RegExp(`@tags:\\s*\\"${searchTerm}"`);
    return tagRegex.test(content);
}
