// Simulated data retrieval from a server
/*async function fetchData() {
    // Simulating an asynchronous data fetch
    return [
        { filename: 'file1.txt', content: '@tags: { "tag1": true, "tag2": false }, @name: "John" ' },
        { filename: 'file2.txt', content: '@tags: { "tag1": false, "tag2": true }, @name: "Alice" ' },
        // Add more files as needed
    ];
}*/

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
            // Use regular expressions to check if the tag exists and is true
            var tagRegex = new RegExp('"'+searchTerm+'":\\s*true');
            return tagRegex.test(file.content);
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
