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

function getCurrentWeather(url) {
  var array = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      array.push(data.data[0].weather.icon);
      var tempF = Math.round(data.data[0].app_temp * (9 / 5) + 32);
      array.push(tempF);
      array.push(Math.round(data.data[0].rh));
      array.push(Math.round(data.data[0].wind_spd));
      array.push(Math.round(data.data[0].uv));
      array.push(day + ", " + month + " " + date + nth(date));
      array.push(data.data[0].city_name);
      storeDay(array);
    });
}

function getFutureWeather(url, url2) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (i = 1; i < 6; i++) {
        var array = [];
        array.push(data.data[i].weather.icon);
        var tempF = Math.round(data.data[i].temp * (9 / 5) + 32);
        array.push(tempF);
        array.push(Math.round(data.data[i].rh));
        array.push(Math.round(data.data[i].wind_spd));
        array.push(Math.round(data.data[i].uv));
        array.push(data.data[i].valid_date);
        array.push(data.city_name);
        storeDay(array);
        console.log("getting Future Weather");
      }
      getCurrentWeather(url2);
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

function displayWeather(anyArray) {
  console.log("displaying weather");
  var iconUrl = "https://www.weatherbit.io/static/img/icons/"; //t01d.png
  //anyArray is an array of 6 objects. LAST is current oops.
  $("#today-date").text(day + ", " + month + " " + date + nth(date));
  date.text = Date.today;
  //Updates current weather information - maybe make this dynamically create cards?
  currentIcon.attr("src", iconUrl + anyArray[5].icon + ".png");
  currentIcon.attr("style", "display:block");
  currentTemp.text("Temperature: " + anyArray[5].temp + " degrees F");
  currentHum.text("Humidity: " + anyArray[5].hum + "%");
  if (anyArray[5].wind > 1) {
    currentWind.text("Wind Speed: " + anyArray[5].wind + " meters per second");
  } else {
    currentWind.text("Wind Speed: " + anyArray[5].wind + " meter per second");
  }
  currentUV.text("UV Index: " + anyArray[5].uv);
  if (anyArray[5].uv < 4) {
    currentUV.attr("style", "background-color: green");
  } else if (anyArray[5] < 7) {
    currentUV.attr("style", "background-color: darkyellow");
  } else {
    currentUV.attr("style", "background-color: red");
  }

  //iterates through the other 5 objects in anyArray and displays their contents to card lists.
  for (i = 0; i < 5; i++) {
    var card_title_id = ("#card" + (i + 1)).toString();
    var card_list_id = ("#card" + (i + 1) + "List").toString();
    //Create date title
    var date1 = anyArray[i].date;
    var newDate = date1.replace("2022-", "");
    $(card_title_id).text(newDate);
    //Create icon item
    var icon = $("<img>");
    icon.attr("src", iconUrl + anyArray[i].icon + ".png");
    $(card_list_id).append(icon);
    //Create temperature list item
    $(card_list_id).append(
      $("<li>" + "Temperature: " + anyArray[i].temp + " degrees F" + "</li>")
    );
    //Create humidity list item
    $(card_list_id).append(
      $("<li>" + "Humidity: " + anyArray[i].hum + "%" + "</li>")
    );
    //Create wind-speed list item
    $(card_list_id).append(
      $(
        "<li>" +
          "Wind Speed: " +
          anyArray[i].wind +
          "meters per second" +
          "</li>"
      )
    );
    //Create uv text with background color
    var uvBtn = $("<li>" + "UV Index: " + anyArray[i].uv + "</li>");
    $(card_list_id).append(uvBtn);
    uvBtn.attr("style", "border-radius: 2px; color: white");
    if (anyArray[i].uv < 4) {
      uvBtn.attr("style", "background-color: green");
    } else if (anyArray[i] < 7) {
      uvBtn.attr("style", "background-color: darkyellow");
    } else {
      uvBtn.attr("style", "background-color: red");
    }
  }
}

function storeDay(anyArray) {
  var cityName = anyArray[6]; //pulls city name string from array
  var thisCity = localStorage.getItem('"' + cityName + '"');
  if (thisCity === null) {
    //if this city is not in local storage (first day loaded)
    thisCity = []; //create an empty array for it
  } else {
    thisCity = JSON.parse(thisCity);
    if (thisCity.length === 6) {
      displayWeather(thisCity);
      return;
    }
  }

  //These should only run if
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
  if (thisCity.length === 6) {
    //How would the length get to 6?
    displayWeather(thisCity); //Ideally this is checking for the city in storage already and then exiting if it already exists.
    return; //does this return out of the if statement or out of the function?
  }
}

$("#button-addon2").on("click", function (event) {
  event.preventDefault();
  var requestUrl1 =
    "https://api.weatherbit.io/v2.0/current?key=e573014323c743afa8705c5a7cf4e3b9&city=";

  var requestUrl2 =
    "https://api.weatherbit.io/v2.0/forecast/daily?key=e573014323c743afa8705c5a7cf4e3b9&city=";
  for (i = 1; i < 6; i++) {
    var card_list_id = ("#card" + i + "List").toString();

    $(card_list_id).children().remove();
  }
  var textValue = $(event.target).siblings().val();
  requestUrl2 += textValue;
  requestUrl1 += textValue;
  var key = localStorage.getItem('"' + textValue + '"');
  console.log(key);
  if (key === null) {
    getFutureWeather(requestUrl2, requestUrl1);
    $("#current-city-name").text("Current weather in " + textValue + ":");
    var newButton = $("<button>" + textValue + "</button>");
    addButtonListener(newButton);
    $("#previous-list").append(newButton);
    console.log(newButton);
    // newButton.on("click", displayStoredWeather(textValue));
  } else {
    $("#current-city-name").text("Current weather in " + textValue + ":");
    key = JSON.parse(key);
    displayWeather(key);
    var newButton = $("<button>" + textValue + "</button>");

    $("#previous-list").append(newButton);
    addButtonListener(newButton);
    console.log("working");
  }
});

function addButtonListener(buttonName) {
  buttonName.on("click", function (event) {
    var city = $(event.target).text();
    $("#current-city-name").text("Current weather in " + city + ":");
    for (i = 1; i < 6; i++) {
      var card_list_id = ("#card" + i + "List").toString();

      $(card_list_id).children().remove();
    }
    console.log($(event.target).text());

    var storedArray = localStorage.getItem('"' + city + '"');
    storedArray = JSON.parse(storedArray);
    displayWeather(storedArray);
  });
}
