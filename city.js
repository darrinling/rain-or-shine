var resultsContainerEl = document.getElementById("#resultsContainer");
var results = document.querySelector('ul');
var foodBtn = document.getElementById('food');
var drinkBtn = document.getElementById('drinks');
var parksBtn = document.getElementById('parks');
var result = document.querySelector('#result');
const homeBtn = document.getElementById("homeBtn")
var weather;


foodBtn.addEventListener("click", getFoodLocations);
drinkBtn.addEventListener("click", getDrinkLocations);
parksBtn.addEventListener("click", getParkLocations);
homeBtn.addEventListener("click", clearZipcode);
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
      result.textContent = 'Showing weather details for ' + data.name + ':';
      localStorage.setItem('temp', data.main.temp);
      var getTemp = localStorage.getItem('temp')
      var temp = document.createElement("li")
      temp.textContent = "Current Weather: " + getTemp + "°F"
      results.appendChild(temp);
    localStorage.setItem("min", data.main.temp_min);
      var getMin = localStorage.getItem('min')
      var min = document.createElement("li")
      min.textContent = "Today's Minimum: " + getMin + "°F"
      results.appendChild(min);
    localStorage.setItem("max", data.main.temp_max);
      var getMax = localStorage.getItem('max')
      var max = document.createElement("li")
      max.textContent = "Today's Maximum: " + getMax+ "°F"
      results.appendChild(max);
    localStorage.setItem("feels", data.main.feels_like);
      var getFeels = localStorage.getItem('feels')
      var feels = document.createElement("li")
      feels.textContent = "It feels like: " + getFeels + "°F"
      results.appendChild(feels);
    localStorage.setItem("description", data.weather[0].description);
      var getDescription = localStorage.getItem('description')
      var descript = document.createElement("li")
      descript.textContent = "It looks like outside it's " + getDescription
      results.appendChild(descript);
     var video = $('#cityVideo source');
     const weather = data.weather[0].id;
     if(weather<300){
       video.attr('src','./Thunder.mp4');
     } else if(weather<500){
      video.attr('src','./Drizzle.mp4');
     } else if(weather<600){
      video.attr('src','./Rain.mp4');
     } else if(weather<700){
      video.attr('src','./Snow.mp4');
     } else if(weather<800){
      video.attr('src','./Atmosphere.mp4');
     } else if(weather===800){
      video.attr('src','./Clear.mp4');
     } else if(weather>800){
      video.attr('src','./Cloudy.mp4');
     }
     document.getElementById('cityVideo').load();
    })
  }

// get place recommendations from Foursquare api
function getFoodLocations() {
  clearChildren();
  result.textContent = 'It is ' + temperature + ' degrees out. Get your grub here:';
  if (temperature < 40 || temperature > 100) {
    result.textContent = "Weather is not good outsde chief, order some takeout"
    var a = document.createElement('a');
    var link = document.createTextNode("GrubHub");
    a.appendChild(link);
    a.title = "Grubhub";
    a.href = "https://www.grubhub.com/"
    a.target = "_blank"
    results.appendChild(a);
    var lineBreak = document.createElement("br")
    results.appendChild(lineBreak);
    var uberEats = document.createElement("a");
    var uberLink = document.createTextNode("UberEats");
    uberEats.appendChild(uberLink);
    uberEats.title = "UberEats"
    uberEats.href = "https://www.ubereats.com/"
    uberEats.target = "_blank"
    results.appendChild(uberEats);
  } else {
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3nqTlLdacSaQr23EEgX2K4a21dujFoDOqoOceOnZOq4U='
    }
  };
  var searchLocation = localStorage.getItem('zipcode');
  var url = 'https://api.foursquare.com/v3/places/search?categories=13000&near=' + searchLocation;

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var distance = (data.results[i].distance / 1609);
        distance = distance.toFixed(2);
        var listItem = document.createElement('li');
        listItem.textContent = data.results[i].name + '  (' + distance + ' mi. away)';;
        results.appendChild(listItem);
      }
    });
  }
}

function getDrinkLocations() {
  clearChildren();
  result.textContent = 'It is ' + temperature + ' degrees out! Cheers!';
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
        var distance = (data.results[i].distance / 1609);
        distance = distance.toFixed(2);
        var listItem = document.createElement('li');
        listItem.textContent = data.results[i].name + '  (' + distance + ' mi. away)';
        results.appendChild(listItem);
      }
    });
  }


  function getParkLocations() {
    clearChildren();
    if (temperature < 40) {
      result.textContent = "Since it's " + temperature + ' degrees out. IT IS NOT RECOMMENDED TO GO OUTSIDE!! But if you must to get outside put on a jacket';
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
        var distance = (data.results[i].distance / 1609);
        distance = distance.toFixed(2);
        var listItem = document.createElement('li');
        listItem.textContent = data.results[i].name + '  (' + distance + ' mi. away)';
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

function clearZipcode() {
  localStorage.removeItem("zipcode");
}
// start with the weather shown for input zip code
getWeather();
// save temperature local storage item to a variable for conditional statements
var temperature = localStorage.getItem('temp');