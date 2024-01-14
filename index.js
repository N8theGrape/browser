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
            // Extract substring starting from @tags
            var tagsSubstring = extractTagsSubstring(file.content);

            // Check if the substring includes the search term
            return tagsSubstring.includes(`"${searchTerm}"`);
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

function extractTagsSubstring(content) {
    // Find the index of @tags
    var startIndex = content.indexOf('@tags');
    if (startIndex !== -1) {
        // Extract the substring starting from @tags
        var substring = content.substring(startIndex);

        // Find the index of the closing bracket of @tags
        var endIndex = substring.indexOf(']');
        if (endIndex !== -1) {
            // Include the closing bracket in the substring
            return substring.substring(0, endIndex + 1);
        }
    }

    // Return an empty string if @tags is not found
    return '';
}
