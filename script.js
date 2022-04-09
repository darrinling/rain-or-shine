var searchBtnEl = document.getElementById("searchBtn");
var cityStateEl = document.getElementById("cityState");
var errorTextEl = document.getElementById("error-text");
var searched = '';

// Update "searched" value
// Check to make sure zip code is 5 digits
// Save "searched" value
// Change to City page
function saveDataAndSwitch() {
  searched = cityStateEl.value;
  if (searched.length !== 5) {
    errorTextEl.innerHTML = 'Zipcodes must be 5 digits!';
    return;
  }

  localStorage.setItem('zipcode', searched);
  window.location = 'city.html';
}

// click on search button or hit enter on input to save zip code to local storage
searchBtnEl.addEventListener("click", saveDataAndSwitch);
cityStateEl.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveDataAndSwitch();
  }
});

var invalidZip = JSON.parse(localStorage.getItem('invalid-zip'));
if (invalidZip === true) {
  localStorage.removeItem('invalid-zip');
  errorTextEl.innerHTML = 'Invalid Zipcode!';
}

