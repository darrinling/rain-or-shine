var resultsContainerEl = document.getElementById("#resultsContainer");
var results = document.querySelector('ul');
var foodBtn = document.getElementById('food');
var result = document.querySelector('#result');
var weather;
result.textContent = 'Weather results for ' + localStorage.getItem('zipcode') + ':';

foodBtn.addEventListener("click", getLocations)

// display current weather conditions based on zip code searched
function getWeather() {
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };
  var searchLocation = localStorage.getItem('zipcode');
  var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchLocation + '&units=imperial' + '&appid=0c8c16e2fdc01233e92bac3bc391f34b';
  console.log(url);

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('temp', data.main.temp);
      Object.keys(data.main).forEach(key => {
        var listItem = document.createElement('li');
        listItem.textContent = key + ': ' + data.main[key];
        results.appendChild(listItem);
      })
    })
    .catch(function(error) {
      window.location = 'index.html';
      localStorage.setItem('invalid-zip', true);
    })
  }

// get place recommendations from Foursquare api
function getLocations() {
  clearChildren();
  result.textContent = 'It is ' + temperature + ' degrees out. Good options would be:';
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3nqTlLdacSaQr23EEgX2K4a21dujFoDOqoOceOnZOq4U='
    }
  };
  var searchLocation = localStorage.getItem('zipcode');
  var url = 'https://api.foursquare.com/v3/places/search?near=' + searchLocation;

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        console.log(data.results[i].name);
        var listItem = document.createElement('li');
        listItem.textContent = data.results[i].name;
        results.appendChild(listItem);
      }
    });
  }

// empty the list
function clearChildren() {
  var child = results.lastElementChild;
  while (child) {
    results.removeChild(child);
    child = results.lastElementChild;
  }
}

// start with the weather shown for input zip code
getWeather();
// save temperature local storage item to a variable for conditional statements
var temperature = localStorage.getItem('temp');

// might want to make a button to refer back home
console.log('connected');

function displayWeather() {
    
}