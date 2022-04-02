var resultsContainerEl = document.getElementById("#resultsContainer");
var results = document.querySelector('ul');
var foodBtn = document.querySelector('#food');
var result = document.querySelector('#result');
var weather;
result.textContent = 'Weather results for ' + localStorage.getItem('zipcode') + ':';

// get lat and long from zip code
// var client = new XMLHttpRequest();
// client.open("GET", "http://api.zippopotam.us/us/90210", true);
// client.onreadystatechange = function() {
// 	if(client.readyState == 4) {
// 		alert(client.responseText);
// 	};
// };

// client.send();

// function zipConvert() {


// display current weather conditions based on zipcode entered
function getWeather() {
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: '0c8c16e2fdc01233e92bac3bc391f34b'
    }
  };
  var searchLocation = localStorage.getItem('zipcode');
  var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchLocation + '&units=imperial' + '&appid=0c8c16e2fdc01233e92bac3bc391f34b';

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.main);
      Object.keys(data.main).forEach(key => {
        var listItem = document.createElement('li');
        listItem.textContent = key + ': ' + data.main[key];
        results.appendChild(listItem);
      })
    })
  }

      // for (var i = 0; i < data.main.length; i++) {
      //   console.log(data[i].main);
      //   var listItem = document.createElement('li');
      //   listItem.textContent = data.main[i];
      //   results.appendChild(listItem);
      // }
  //   });
  // }

// get place recommendations from Foursquare api
function getLocations() {
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

getWeather();


// might want to make a button to refer back home