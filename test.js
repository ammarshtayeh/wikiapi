
document.addEventListener('DOMContentLoaded', function() {
    let searchResultsDiv = document.getElementById('search-results');
    let searchInput = document.getElementById('search-input');
    let searchButton = document.getElementById('search-button');

    searchInput.addEventListener('input', function() {
        let searchTerm = searchInput.value;

        searchResultsDiv.innerHTML = '';

        if (searchTerm.length >= 3) {
            fetch('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + searchTerm)
                .then(response => response.json())
                .then(data => {
                    let suggestions = data[1];
                    suggestions.forEach(function(suggestion) {
                        let suggestionItem = document.createElement('div');
                        suggestionItem.textContent = suggestion;
                        searchResultsDiv.appendChild(suggestionItem);
                    });
                })
                .catch(error => console.error(error));
        }
    });

    searchButton.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.which === 13) {
            event.preventDefault();
            performSearch();
        }
    });

    function performSearch() {
        let searchTerm = searchInput.value;

        searchResultsDiv.innerHTML = '';

        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=' + searchTerm)
            .then(response => response.json())
            .then(data => {
                let searchResults = data.query.search;
                searchResults.forEach(function(result) {
                    let title = result.title;
                    let snippet = result.snippet;

                    let searchResult = document.createElement('div');
                    searchResult.classList.add('search-result');
                    searchResult.innerHTML = '<h3>' + title + '</h3><p>' + snippet + '</p>';

                    let explanation = document.createElement('p');
                    explanation.textContent = 'Title: ' + title + ', Snippet: ' + snippet;

                    searchResult.appendChild(explanation);
                    searchResultsDiv.appendChild(searchResult);
                });
            })
            .catch(error => console.error(error));
    }
});
