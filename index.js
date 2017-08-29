//On page load a function will execute to listen for the 'Submit' event and load the 'params object', which will be pre-populated with the api key as a string

//When a user fills out the search input and clicks 'Sumbit' a function will execute which will populate the 'params object' with the value from the text input and adds a string to the key 'q'.  The function will next perform a .getJSON method passed the api URL endpoint, 'param object' and a callback function.

//The .getJSON method makes a GET request of the youtube API and returns a JSON object which will be passed to the callback function 'displaySearchResults', which will in turn post the data to the user.

$(thinkfulTube);

const paramsObject = {
  key: 'AIzaSyBTGelakatdFEj26WfiNw_qNL7K9uFh2CQ',
  maxResults: 10,
  part: 'snippet'
};
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search';


//initiates event listeners
function thinkfulTube() {
  console.log('`thinkfulTube` loaded');
  $('#search-submit-button').click( event => {
    console.log('Submit Clicked');
    event.preventDefault();
    paramsObject.q = $('#search-input').val();
    console.log(paramsObject);
    $('#search-input').val("");
    getDataFromApi(paramsObject, displaySearchResults)
  });
};


//callback function that executes on 'Submit' to GET JSON data from youTube server
function getDataFromApi(searchObject, callback) {
  console.log('`getDataFromApi` ran');

$.getJSON(youTubeURL, paramsObject, callback );
};

//callback function to display search results from youTube API
function renderResults(result) {
  console.log('`renderResults` ran');
  console.log(result.snippet.thumbnails.default);

  return`<div>
      <h2>${result.snippet.title}</h2>
      <p>${result.snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img src='${result.snippet.thumbnails.high.url}', width='${result.snippet.thumbnails.high.width}' height= '${result.snippet.thumbnails.high.height}'></a>
  </div>`;
};




function displaySearchResults(result) {
  console.log('`displaySearchResults` ran');
  let text = result.items.map( (item, index) =>  renderResults(item) );
  console.log(text);
  $('#js-search-results').html  (text);
};
