var currentIcon = $("#icon0");
var currentTemp = $("#temp0");
var currentHum = $("#humidity0");
var currentWind = $("#wind0");
var currentUV = $("#uv0");
var today = new Date();
var weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var day = weekdays[today.getDay()];
var month = months[today.getMonth()];
var date = today.getDate();
var storedCities = [];
var newDay = {
  icon: "",
  temp: "",
  hum: "",
  wind: "",
  uv: "",
  date: "",
  name: "",
};

var requestUrl1 =
  "https://api.weatherbit.io/v2.0/current?key=e573014323c743afa8705c5a7cf4e3b9&city=";
var requestUrl2 =
  "https://api.weatherbit.io/v2.0/forecast/daily?key=e573014323c743afa8705c5a7cf4e3b9&city=Denver";

function getCurrentWeather(url) {
  var array = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      array.push(data.data[0].weather.icon);
      array.push(Math.round(data.data[0].app_temp));
      array.push(Math.round(data.data[0].rh));
      array.push(Math.round(data.data[0].wind_spd));
      array.push(Math.round(data.data[0].uv));
      array.push(day + ", " + month + " " + date + nth(date));
      array.push(data.data[0].city_name);
      storeDay(array);
    });
  getFutureWeather(requestUrl2);
}
// getCurrentWeather(requestUrl1);
// getFutureWeather(requestUrl2);

function getFutureWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        var array = [];
        console.log(i);
        array.push(data.data[i].weather.icon);
        console.log(array);
        array.push(Math.round(data.data[i].temp));
        console.log(data.data[i].temp);
        array.push(Math.round(data.data[i].rh));
        array.push(Math.round(data.data[i].wind_spd));
        array.push(Math.round(data.data[i].uv));
        array.push(data.data[i].valid_date);
        array.push(data.city_name);
        console.log(array);
        storeDay(array);
      }
    });
}
function nth(d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function displayCurrentWeather(anyArray) {
  //displays current date on page
  $("#today-date").text(day + ", " + month + " " + date + nth(date));
  date.text = Date.today;
  //Updates current weather information - maybe make this dynamically create cards?
  currentIcon.text(anyArray[5].icon);
  currentTemp.text("Temperature: " + anyArray[5].temp + " degrees (C)");
  currentHum.text("Humidity: " + anyArray[5].hum + "%");
  if (anyArray[5].wind > 1) {
    currentWind.text("Wind Speed: " + anyArray[5].wind + " meters per second");
  } else {
    currentWind.text("Wind Speed: " + anyArray[5].wind + " meter per second");
  }
  currentUV.text("UV Index: " + anyArray[5].uv);
}

function displayFutureWeather(anyArray) {
  for (i = 1; i < 6; i++) {
    var card_list_id = ("#card" + i + "List").toString();
    var list = $(card_list_id);
    console.log(list);

    var card_id = ("card" + i).toString();
    var cardDate = $(card_id);
    var date = $("<h5>");
    var icon = $("<li>");
    var temp = $("<li>");
    var humid = $("<li>");
    var wind = $("<li>");
    var uv = $("<li>");

    date = anyArray[i].date;
    icon = anyArray[i].icon;
    temp = anyArray[i].temp;
    humid = anyArray[i].hum;
    wind = anyArray[i].wind;
    uv = anyArray[i].uv;

    console.log(card_list_id);
    list.append(icon);
    list.append(temp);
    list.append(humid);
    list.append(wind);
    list.append(uv);
    cardDate.text(date);
    console.log(cardDate);
  }
}
// console.log(data.data[0].wind_cdir);
//when this array is getting passed around, have an array item that is city name. In storeCity() function, firs
//Tonight: display all 6 cards with data on screen, storing searched cities in local storage

function storeDay(anyArray) {
  var cityName = anyArray[6]; //pulls city name string from array
  var thisCity = localStorage.getItem('"' + cityName + '"');
  console.log(thisCity);
  if (thisCity === null) {
    //if this city is not in local storage (first day loaded)
    thisCity = []; //create an empty array for it
  } else {
    thisCity = JSON.parse(thisCity);
  }
  console.log(thisCity);
  if (thisCity.length === 6) {
    displayCurrentWeather(thisCity);
    displayFutureWeather(thisCity);
    return;
  }
  newDay.icon = anyArray[0];
  newDay.temp = anyArray[1];
  newDay.hum = anyArray[2];
  newDay.wind = anyArray[3];
  newDay.uv = anyArray[4];
  newDay.date = anyArray[5];
  newDay.name = anyArray[6];
  thisCity.push(newDay);
  console.log(thisCity);

  localStorage.setItem('"' + cityName + '"', JSON.stringify(thisCity));
}

$("#button-addon2").on("click", function (event) {
  event.preventDefault();
  var textValue = $(event.target).siblings().val();
  requestUrl1 += textValue;

  getCurrentWeather(requestUrl1);
  $("#current-city-name").text("Current weather in " + textValue + ":");
  // var textValue = $(event.target).siblings().eq(0).val();
  // console.log($(event.target).siblings().eq(0).val());
  // requestUrl1 += textValue;
});
function appendCard() {}

// // JavaScript:
// const address = fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((response) => response.json())
//   .then((user) => {
//     return user.address;
//   });
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
