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
                    //display info from api to screen
                    api_result = result;
                    console.log(api_result)               
                    //Skycon Source: http://darkskyapp.github.io/skycons/
                    var skycons = new Skycons({"color": "#3399ff"});
                    switch (result.currently.icon) {
                        case "clear-day":
                            skycons.add("icon1", Skycons.CLEAR_DAY);
                            break;
                        case "clear-night":
                            skycons.add("icon1", Skycons.CLEAR_NIGHT);
                            break;
                        case "partly-cloudy-day":
                            skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
                            break;
                        case "partly-cloudy-night":
                            skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
                            break;
                        case "cloudy":
                            skycons.add("icon1", Skycons.CLOUDY);
                            break;
                        case "rain":
                            skycons.add("icon1", Skycons.RAIN);
                            break;
                        case "sleet":
                            skycons.add("icon1", Skycons.SLEET);
                            break;
                        case "snow":
                            skycons.add("icon1", Skycons.SNOW);
                            break;
                        case "wind":
                            skycons.add("icon1", Skycons.WIND);
                            break;
                        case "fog":
                            skycons.add("icon1", Skycons.FOG);
                    }
                    skycons.play();
                    dispalyResult(result);
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
                        dispalyResult(result);
                    },
                });
            });

            //F and C temp convertor
            $(".F-to-C").click(function(){
                //if F, to C
                if ($(".weather-word").text().match(/F/) !== null) {
                    $(".weather-word").text(((api_result.currently.temperature - 32)  /1.8).toFixed(1));
                    $(".weather-word").append(" °C");
                    //$(".weather-word").append('<br>');
                    //$(".weather-word").append(api_result.currently.summary);
                }
                //if C, to F
                else {
                    $(".weather-word").text(api_result.currently.temperature.toFixed(1));
                    $(".weather-word").append(" °F");
                    //$(".weather-word").append('<br>');
                    //$(".weather-word").append((api_result).weather[0].description);
                }
                $(".weather-word").append('<br>');
                $(".weather-word").append(api_result.currently.summary);
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

    //function to display api result on screen
    function dispalyResult(result) {
        $(".location-word").append(" Weather");
        $(".weather-word").text((result.currently.temperature).toFixed(1));
        $(".weather-word").append(" °F");
        $(".weather-word").append('<br>');
        $(".weather-word").append(result.currently.summary);
        $(".wind-word").text("Wind ");
        $(".wind-word").append(result.currently.windSpeed);
        $(".wind-word").append(' m/s ');
        $(".wind-word").append('<br>');
        $(".wind-word").append(result.currently.windBearing);
        $(".wind-word").append(' degree');
    }

});
