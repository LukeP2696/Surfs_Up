loadClientData(clientData);

function loadClientData(clientData) {
    console.log('clientData', clientData);
    // define screen view port
    document.body.style.height = clientData.screen.screen_height + 'px';
    document.body.style.width = clientData.screen.screen_width + 'px';

    if (parseInt(clientData.screen.screen_width) < parseInt(clientData.screen.screen_height)) {
        if ($('#location-header').hasClass('col-6')) {
            $('#location-header').removeClass('col-6');
            $('#location-header').addClass('col-12');
        }
        if ($('#left-container').hasClass('col')) {
            $('#left-container').removeClass('col');
            $('#left-container').addClass('col-12');
        }
        if ($('#right-container').hasClass('col')) {
            $('#right-container').removeClass('col');
            $('#right-container').addClass('col-12');
        }
    	if ($('#middle-gutter').hasClass('col-1')) {
            $('#middle-gutter').removeClass('col-1');
            $('#middle-gutter').addClass('col-12');
        }
    }
}
/*
function chooseTimeFormat(clientData) {
let selection = clientData.screen.adverts_tides_time_24h;

if(selection == "1") {

}else {

}
}
*/
//LOADING JSON START
let timeMinus1 = new Date();
timeMinus1.setHours(timeMinus1.getHours() - 1);

let weatherDataAvaliable = false;
let tideDataAvaliable = false;
let UVDataAvaliable = false;
let openWeather = {};
let worldTides = {};
let UVRating = {};
/*
 * Function that retrieves Weather Data from OpenWeather API JSON File.
 */
let retrieveWeatherData = function (cityId) {
    let weatherPromise = new Promise((resolve, reject) => {
        let weatherJson = document.createElement('script');
        weatherJson.src = 'https://cs1906.scem.westernsydney.edu.au/assets/php/weather_' + cityId + '.json';
        weatherJson.async = true;
        weatherJson.onload = () => {
            console.log('loaded weather data');
            resolve();
        };

        weatherJson.onerror = () => {
            console.error('failed to retrieve weather data');
            reject();
        };
        document.body.appendChild(weatherJson);
    });

    weatherPromise.then(() => {
        // success function
        localStorage.setItem('single', JSON.stringify(weatherDataSingle));
        localStorage.setItem('single-timestamp', new Date().getTime());
        weatherDataAvaliable = true;
        weatherDisplay();
    }, () => {
        // rejected function
        weatherDataAvaliable = false;
        weatherDisplay();
    })
};
let checkWeatherStorage = function () {
    if (localStorage.getItem('single') === null) {
        retrieveWeatherData(clientData['screen']['user_screens_weather_code']);
    } else if (localStorage.getItem('single-timestamp') <= timeMinus1.getTime()) {
        retrieveWeatherData(clientData['screen']['user_screens_weather_code']);
    } else {
        weatherDataAvaliable = true;
        weatherDisplay();
    }
}
let weatherDisplay = function () {
    if (weatherDataAvaliable) {
        // do this
        openWeather = JSON.parse(localStorage.getItem('single'));
        document.getElementById('Location-Name').innerHTML = openWeather.name;
        document.getElementById('outsideTemp').innerHTML = openWeather.main.temp;
        document.getElementById('CurrentHumidity').innerHTML = openWeather.main.humidity;
        document.getElementById('WindSpeed').innerHTML = openWeather.wind.speed;
        document.getElementById('currentCondition').innerHTML = openWeather.weather[0].main;

    } else {
        // hide relevant content
        document.getElementById('outsideTemp').hidden = true;
        document.getElementById('CurrentHumidity').hidden = true;
        document.getElementById('WindSpeed').hidden = true;
        document.getElementById('currentCondition').hidden = true;
    }
}
/*
 * 
 * Retrieves UV Rating Data From Open Weather API JSON File.
 *
 */
let retrieveUVData = function (cityId) {
    let UVPromise = new Promise((resolve, reject) => {
        let UVJson = document.createElement('script');
        UVJson.src = 'https://cs1906.scem.westernsydney.edu.au/assets/php/UVRating_' + cityId + '.json';
        UVJson.async = true;
        UVJson.onload = () => {
            console.log('loaded UVRating data');
            resolve();
        };

        UVJson.onerror = () => {
            console.error('failed to retrieve UVRating data');
            reject();
        };
        document.body.appendChild(UVJson);
    });

    UVPromise.then(() => {
        // success function
        localStorage.setItem('singleUVRating', JSON.stringify(UVDataSingle));
        localStorage.setItem('singleUVRating-timestamp', new Date().getTime());
        UVDataAvaliable = true;
        UVDisplay();
    }, () => {
        // rejected function
        UVDataAvaliable = false;
        UVDisplay();
    })
};
let checkUVStorage = function () {
    if (localStorage.getItem('singleUVRating') === null) {
        retrieveUVData(clientData['screen']['user_screens_weather_code']);
    } else if (localStorage.getItem('singleUVRating-timestamp') <= timeMinus1.getTime()) {
        retrieveUVData(clientData['screen']['user_screens_weather_code']);
    } else {
        UVDataAvaliable = true;
        UVDisplay();
    }
}
let UVDisplay = function () {
    if (UVDataAvaliable) {
        // do this
        retrieveUVIndex = JSON.parse(localStorage.getItem('singleUVRating'));
        let retrievedUVIndex = retrieveUVIndex.value

        if (retrievedUVIndex > 0 && retrievedUVIndex < 2.9) {
            $("#currentUV").text("Low");
        } else if (retrievedUVIndex > 3.0 && retrievedUVIndex < 5.9) {
            $("#currentUV").text("Moderate");
        } else if (retrievedUVIndex > 6.0 && retrievedUVIndex < 7.9) {
            $("#currentUV").text("High");
        } else if (retrievedUVIndex > 8.0 && retrievedUVIndex < 10.9) {
            $("#currentUV").text("Very High");
        } else if (retrievedUVIndex > 10.9) {
            $("#currentUV").text("Extreme");
        }
    } else {
        //Hide Relevant Content
        document.getElementById('currentUV').hidden = true;
    }
}
/*
 * 
 * Retrieves Tidal Information From World Tides API
 *
 */
let retrieveTideData = function (cityId) {
    let tidePromise = new Promise((resolve, reject) => {
        let tideJson = document.createElement('script');
        tideJson.src = 'https://cs1906.scem.westernsydney.edu.au/assets/php/tides_' + cityId + '.json';
        tideJson.async = true;
        tideJson.onload = () => {
            console.log('loaded Tide data');
            resolve();
        };

        tideJson.onerror = () => {
            console.error('failed to retrieve Tide data');
            reject();
        };
        document.body.appendChild(tideJson);
    });

    tidePromise.then(() => {
        // success function
        localStorage.setItem('singleTides', JSON.stringify(tideDataSingle));
        localStorage.setItem('singleTides-timestamp', new Date().getTime());
        tideDataAvaliable = true;
        tideDisplay();
    }, () => {
        // rejected function
        tideDataAvaliable = false;
        tideDisplay();
    })
};
let checkTideStorage = function () {
    if (localStorage.getItem('singleTides') === null) {
        retrieveTideData(clientData['screen']['user_screens_weather_code']);
    } else if (localStorage.getItem('single-timestamp') <= timeMinus1.getTime()) {
        retrieveTideData(clientData['screen']['user_screens_weather_code']);
    } else {
        tideDataAvaliable = true;
        tideDisplay();
    }
}
let tideDisplay = function () {
    if (tideDataAvaliable) {
        // do this
        worldTides = JSON.parse(localStorage.getItem('singleTides'));
        document.getElementById('tideHeight').innerHTML = worldTides.extremes[0].height;
        document.getElementById('currentTide').innerHTML = worldTides.extremes[0].type;
    } else {
        //Hide Relevant Content
        console.log('NO DATA');
        document.getElementById('tideHeight').hidden = true;
        document.getElementById('thTitle').hidden = true;
        document.getElementById('currentTide').hidden = true;
        document.getElementById('ctTitle').hidden = true;
    }
}
/*
 * Function that determines the tide height of the animated wave.
 */
let showTideHeight = function () {
    if (tideDataAvaliable) {
        showTide = JSON.parse(localStorage.getItem('singleTides'));
        let currentTide = showTide.extremes[0].type;
        if (currentTide == 'High') {
            $('head').append('<link rel="stylesheet" href="assets/css/waves-high.css"/>');
            $('#ocean').addClass('ocean-high');
        } else {
            $('head').append('<link rel="stylesheet" href="assets/css/waves-low.css"/>');
            $('#ocean').addClass('ocean-low');
        }
    }
}
/*
 * Function that determines the time of day and displays the relevant background.
 */
let DayOrNight = function () {

    let currentDate = new Date();
    let currentHour = currentDate.getHours();

    currentCondition = JSON.parse(localStorage.getItem('single'));
    let conditionDay = currentCondition.weather[0].main;

    if (conditionDay == "Rain") {
        var currentWeather = "#A9A9A9";
    } else if (conditionDay == "Clouds") {
        var currentWeather = "#A9A9A9";
    } else if (conditionDay == "Thunderstorm") {
        var currentWeather = "A9A9A9";
    }
    if (clientData.screen.screen_width >= clientData.screen.screen_height) {
        var circleSize = clientData.screen.screen_width / 10.4;
    } else {
        var circleSize = clientData.screen.screen_width / 10.4;
    }
    if (currentHour > 6 && currentHour < 19) {
        document.body.className = "day";
        var tmpStyle = $('body').attr('style') + "background:radial-gradient(circle " + circleSize + "px at 95% 5%, yellow, yellow, yellow, yellow," + currentWeather + ");";
        $('body').attr('style', tmpStyle);
        iconSelectionDay();
    } else {
        document.body.className = "night";
        var tmpStyle = $('body').attr('style') + "background:radial-gradient(circle " + circleSize + "px at 95% 5%, lightgrey, lightgrey, lightgrey, lightgrey, #0f2027);";
        $('body').attr('style', tmpStyle);
        $('#UV').remove();
        iconSelectionNight();
    }
}
/*
 * function that provides the required selection of Icons for daytime.
 */
let iconSelectionDay = function () {

    retrievedDayIcon = JSON.parse(localStorage.getItem('single'));
    let Dayicon = retrievedDayIcon.weather[0].main;
    if (Dayicon == 'Clear') {
        $('#currentIcon').addClass('wi wi-day-sunny wi-fw 1');

    } else if (Dayicon == 'Clouds') {
        $('#currentIcon').addClass('wi wi-cloud wi-fw 1');


    } else if (Dayicon == 'Rain') {
        $('#currentIcon').addClass('wi wi-rain wi-fw 1');


    } else if (Dayicon == 'Thunderstorm') {
        $('#currentIcon').addClass('wi wi-thunderstorm wi-fw 1');

    }
}
/*
 * function that provides the required selection of Icons for nighttime.
 */
let iconSelectionNight = function () {

    retrievedNightIcon = JSON.parse(localStorage.getItem('single'));
    let Nighticon = retrievedNightIcon.weather[0].main;

    if (Nighticon == 'Clear') {
        $('#currentIcon').addClass('wi wi-night-clear wi-fw 1');

    } else if (Nighticon == 'Clouds') {
        $('#currentIcon').addClass('wi wi-night-partly-cloudy wi-fw 1');

    } else if (Nighticon == 'Rain') {
        $('#currentIcon').addClass('wi wi-night-alt-rain wi-fw 1');

    } else if (Nighticon == 'Thunderstorm') {
        $('#currentIcon').addClass('wi wi-thunderstorm wi-fw 1');
    }
}
/*
 * function that provides the required selection of Icon for current wind direction.
 */
let calculateWindDirection = function () {

    retrieveWindDirection = JSON.parse(localStorage.getItem('single'));
    let currentWindDirection = retrieveWindDirection.wind.deg;
    if (currentWindDirection > 348.75 && currentWindDirection <= 11.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-n wi-fw 1')
        $("#windDirection").text("N");

    } else if (33.75 < currentWindDirection && currentWindDirection <= 56.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-ne wi-fw 1')
        $("#windDirection").text("NE");


    } else if (78.75 < currentWindDirection && currentWindDirection <= 101.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-e wi-fw 1')
        $("#windDirection").text("E");


    } else if (123.5 < currentWindDirection && currentWindDirection <= 146.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-se wi-fw 1')
        $("#windDirection").text("SE");


    } else if (168.5 < currentWindDirection && currentWindDirection <= 191.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-s wi-fw 1')
        $("#windDirection").text("S");


    } else if (213.75 < currentWindDirection && currentWindDirection <= 236.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-sw wi-fw 1')
        $("#windDirection").text("SW");


    } else if (258.75 < currentWindDirection && currentWindDirection <= 281.25) {
        $('#dIcon').addClass('wi wi-wind wi-towards-w wi-fw 1')
        $("#windDirection").text("W");


    } else {
        $('#dIcon').addClass('wi wi-wind wi-towards-nw wi-fw 1')
        $("#windDirection").text("NW");

    }
}
/*
 * function that provides the No-Data display when JSON data is not detected for All 3 APIs
 */
/*
let NoData = function () {
    if ((!weatherDataAvaliable && !UVDataAvailable && !tideDataAvailable)) {
        $('head').append('<link rel="stylesheet" href="assets/css/No-Data.css"/>');
        $('body').append('<h2>NO DATA AVAILABLE CURRENTLY</h2>');
    }
}
*/
/*
let screenType = function() {
console.log(screenType);
if (clientData.screen.screen_width < clientData.screen.screen_height) {

}else if ( clientData.screen.screen_height > clientData.screen.screen_width) {
  
}
}
*/

/*
 * function that calls all the LocalStorage relevant functions
 */
let checkAllStorage = function () {
    checkWeatherStorage();
    checkUVStorage();
    checkTideStorage();
    //NoData();
}
/*
 * function that runs all other functions.
 */
let runAll = function () {
    DayOrNight();
    calculateWindDirection();
    showTideHeight();
}
checkAllStorage();
runAll();
// LOADING JSON END