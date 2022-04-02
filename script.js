

var searchBtnEl = document.getElementById("searchBtn");
var cityStateEl = document.getElementById("cityState");
var searched;

// click on search button to save zip code to local storage
searchBtnEl.addEventListener("click", saveData)

function saveData() {
  searched = cityStateEl.value;
  localStorage.setItem('zipcode', searched);
}
