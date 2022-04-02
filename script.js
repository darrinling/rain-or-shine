// fetch('', {
//   // The browser fetches the resource from the remote server without first looking in the cache.
//   // The browser will then update the cache with the downloaded resource.
//   cache: 'reload',
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

  var searchBtnEl = document.getElementById("searchBtn");

  searchBtnEl.addEventListener("click", getData)
// script file works and its connected
  function getData() {
    console.log("connected");
  }
  