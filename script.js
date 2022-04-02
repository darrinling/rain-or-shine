

  var searchBtnEl = document.getElementById("searchBtn");
  var cityStateEl = document.getElementById("cityState");
  var searched;

  searchBtnEl.addEventListener("click", saveData)
  console.log(searched);
// click on search button and save data to local storage
  function saveData() {
    searched = cityStateEl.value;
    localStorage.setItem('zipcode', searched);
  }

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: 'fsq3nqTlLdacSaQr23EEgX2K4a21dujFoDOqoOceOnZOq4U='
  //   }
  // };

  // var url = 'https://api.foursquare.com/v3/places/search?near=boulder%2C%20co';
  // var searchLocation = ;
  // fetch(url, options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));