console.log("Hello!");
//TODO: Check if I can get data from API
//TODO: Add ids and variables for display
//TODO: Create event listeners for serach and clicking old examples

var requestUrl1 =
  "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=573014323c743afa8705c5a7cf4e3b9&include=minutelye";

function getApi() {
  fetch(requestUrl1).then(function (response) {
    console.log(response);
  });
}

getApi();
// JavaScript:

// Functions:
// function init(){
//     pulls array of objects from local storage and stores in global variable
//     displays 8 most recent city names on left
// }

// function getData(name of city string) {
//     if this string is in the local storage array {
//         index = index of this item
//         display(local storage item at index)
//     } else {
//         var url = "string start"+"user input city name"
//         getApi(url)
//         push new object to local storage array
//         display(local storage item at index)
//         }
// }

// function displayData(index of item in local storage) {
//     variable.textContent = localStorageArray[i].key;
//     variable.textContent = localStorageArray[i].key;
//     variable.textContent = localStorageArray[i].key;
//     variable.textContent = localStorageArray[i].key;
// }

// function getApi(request) {
//   fetch(request)
//     .then(function (response) {
//       console.log(response);
//     .then(function (data) {
//       console.log(data);
//     });
// }

// TODO:
// Link bootstrap, jQuery, jQuery UI, js file, css override file
// Create layout with bootstrap and overide css
// Explore Api
// Declare any interactive variables in JavaScript
// Write functions using these variables and the api
// Bug fixes
