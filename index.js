//On page load a function will execute to listen for the 'Submit' event and load the 'params object', which will be pre-populated with the api key as a string

//When a user fills out the search input and clicks 'Sumbit' a function will execute which will populate the 'params object' with the value from the text input and adds a string to the key 'q'.  The function will next perform a .getJSON method passed the api URL endpoint, 'param object' and a callback function.

//The .getJSON method makes a GET request of the youtube API and returns a JSON object which will be passed to the callback function 'displaySearchResults', which will in turn post the search data to the user.


const paramsObject = {
  key: 'AIzaSyBTGelakatdFEj26WfiNw_qNL7K9uFh2CQ',
  maxResults: 10,
  part: 'snippet'
};
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search';

//callback function that executes on 'Submit' to GET JSON data from youTube server
function getDataFromApi(searchObject, callback) {
  $.getJSON(youTubeURL, searchObject, callback);
}

//callback function to display search results from youTube API
function renderResults(result) {
  return`<div class="results">
      <h2><a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      ${result.snippet.title}</a></h2>
      <p>${result.snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img src='${result.snippet.thumbnails.high.url}' alt='${result.snippet.thumbnails.title}', width='${result.snippet.thumbnails.high.width}' height= '${result.snippet.thumbnails.high.height}'></a>
  </div>`;
}

function displaySearchResults(result) {
  $('#js-search-results').append(
    `<div class="resultsPerPage">Showing <strong>${result.pageInfo.resultsPerPage}</strong> of <strong>${result.pageInfo.totalResults}</strong> Search Results
    </div>`
  );
  let text = result.items.map(item => renderResults(item));
  $('#js-search-results').append(text);
  $('#js-search-results').prop('hidden', false);
}

//initiates event listeners
function thinkfulTube() {
  $('#search-submit-button').click(event => {
    event.preventDefault();
    paramsObject.q = $('#search-input').val();
    $('#search-input').val('');
    getDataFromApi(paramsObject, displaySearchResults);
  });
}

//On page load, call the function 'thinkfulTube'
$(thinkfulTube);
