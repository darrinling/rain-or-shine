var resultsContainerEl = document.getElementById("#resultsContainer");
var results = document.querySelector('ul');
var foodBtn = document.getElementById('food');
var drinkBtn = document.getElementById('drinks');
var parksBtn = document.getElementById('parks');
var result = document.querySelector('#result');
var weather;
result.textContent = 'Weather results for ' + localStorage.getItem('zipcode') + ':';

foodBtn.addEventListener("click", getFoodLocations);
drinkBtn.addEventListener("click", getDrinkLocations);
parksBtn.addEventListener("click", getParkLocations);

// display current weather conditions based on zip code searched
function getWeather() {
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };
  var auth = 'id=0c8c16e2fdc01233e92bac3bc391f34b'
  var searchLocation = localStorage.getItem('zipcode');

  var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchLocation + '&units=imperial' + '&app' + auth;


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
function getFoodLocations() {
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
  var url = 'https://api.foursquare.com/v3/places/search?categories=13064&near=' + searchLocation;

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

function getDrinkLocations() {
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
  var url = 'https://api.foursquare.com/v3/places/search?categories=13003&near=' + searchLocation;

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

function getParkLocations() {
  clearChildren();
  if (temperature < 50) {
    result.textContent = 'It is ' + temperature + ' degrees out. NOT RECOMMENDED!! But if you have to get outside put on a jacket';
  } else {
  result.textContent = 'It is ' + temperature + ' degrees out. Good options would be:';

  }
    var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3nqTlLdacSaQr23EEgX2K4a21dujFoDOqoOceOnZOq4U='
    }
  };
  var searchLocation = localStorage.getItem('zipcode');
  var url = 'https://api.foursquare.com/v3/places/search?categories=16032&near=' + searchLocation;

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
        console.log(listItem);
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
