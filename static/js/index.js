$(document).ready(function() {
  //check if Geolocation supported by browser
  if (navigator.geolocation) {
    console.log("Geolocation is supported!")
  }
  else {
    console.log("Geolocation is not supported");
  }
  
  //set timeout 
  window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }
  
  //get lat and lon from brower
  var geoSuccess = function(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var lon = startPos.coords.longitude;
    //console.log(lat);
    //console.log(lon);
    
    var api_result;
    
    //call coord-weather api
    $.ajax({
      url: 'https://api.darksky.net/forecast/1af67183cef5d949bedcd224d2bdd9fd/'+lat+','+lon,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(result){
        //console.log(result);
        //display values from api to screen
        api_result = result;
        $(".location-word").text((result).name);
        $(".location-word").append(" Weather");
        $(".weather-word").text((((result).main.temp -  273.15) * 1.8 + 32).toFixed(1));
        $(".weather-word").append(" °F");
        $(".weather-word").append('<br>');
        $(".weather-word").append((result).weather[0].description);
        $(".wind-word").text("Wind ");
        $(".wind-word").append((result).wind.speed);
        $(".wind-word").append(' m/s ');
        $(".wind-word").append('<br>');
        $(".wind-word").append((result).wind.deg);
        $(".wind-word").append(' degree');
      },
    });
    
    //prompt if user click Not Your City? and use city-weather api
    $(".not-location").click(function(){
      var city = prompt("What's your city?");   
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=71b3cacbc424d3b853633059c376370e',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(result){
          api_result = result;
          $(".location-word").text((result).name);
          $(".location-word").append(" Weather");
          $(".weather-word").text((((result).main.temp -  273.15) * 1.8 + 32).toFixed(1));
          $(".weather-word").append(" °F");
          $(".weather-word").append('<br>');
          $(".weather-word").append((result).weather[0].description);
          $(".wind-word").text("Wind ");
          $(".wind-word").append((result).wind.speed);
          $(".wind-word").append(' m/s ');
          $(".wind-word").append('<br>');
          $(".wind-word").append((result).wind.deg);
          $(".wind-word").append(' degree');
        },
      });  
    });
    
    //F and C temp convertor
    $(".F-to-C").click(function(){
      //if F, to C
      if ($(".weather-word").text().match(/F/) !== null) {
        $(".weather-word").text(((api_result).main.temp - 273.15).toFixed(1));
        $(".weather-word").append(" °C");
        $(".weather-word").append('<br>');
        $(".weather-word").append((api_result).weather[0].description);
      }
      //if C, to F
      else {
        $(".weather-word").text((((api_result).main.temp -  273.15) * 1.8 + 32).toFixed(1));
        $(".weather-word").append(" °F");
        $(".weather-word").append('<br>');
        $(".weather-word").append((api_result).weather[0].description);
      }
    });
  };
    
  //show error code if any  
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
    
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    
  };  
  
});
