<?php
/* BY: Stuart McIntosh
 * loadData.php
 * Load weather and tide json files using curl. 
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);

/**
 * main
 * 
 * Run the loadWeather, loadTides and loadUVRating functions.
 */
main();

function main() {
    loadWeather();
    loadTides();
 	loadUVRating();
}

/** 
 * loadWeather
 * 
 * Load a weather json from openweathermap API.
 * $cityID comes from http://bulk.openweathermap.org/sample/city.list.json.gz
 * Stores file as Weather_$cityID.json
 */
function loadWeather() {
    $APPID="55eee9649760c1573038cb619e06d329";
    $cityID="7839700";
    $url="api.openweathermap.org/data/2.5/weather?APPID=".$APPID."&id=".$cityID."&units=metric";

    $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    if ( !$data = curl_exec($ch)) {
    	throw new Exception(curl_error($ch));
    } else {
    	curl_close($ch);
    	$file = 'weather_'. $cityID . '.json';
    	$file = fopen($file, "w");
    	fwrite($file, "var weatherDataSingle = " . $data);
    }
    fclose($file);
}
/**
 * loadTides
 * 
 * Load a tide json from WorldTides API.
 * Stores file as tides_$locName.json
 * 
 * Botany Bay (-33.946602, 151.198746)
 */
function loadTides() {
    $apiKey = "92999236-75f1-4301-998c-e7ab806e6aaa";
    $locName = "Botany Bay";
    $latitude = "-33.946602";
    $longitude = "151.198746";
    $cityID = "7839700";
    $url = "http://www.worldtides.info/api?extremes&lat=".$latitude."&lon=".$longitude."&key=".$apiKey;

    $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    if ( !$data = curl_exec($ch)) {
    	throw new Exception(curl_error($ch));
    } else {
    	curl_close($ch);
    	$file = 'tides_'. $cityID . '.json';
    	$file = fopen($file, "w");
    	fwrite($file, "var tideDataSingle = " . $data);
    }
    fclose($file);
}

/** 
 * loadUVRating
 * 
 * Load a UV Rating json from openweathermap API.
 * Stores file as uvRating_$cityID.json
 */
function loadUVRating() {
    $APPID="55eee9649760c1573038cb619e06d329";
    $lat="-33.946602";
    $lon="151.198746";
    $cityID ="7839700";
    $url="http://api.openweathermap.org/data/2.5/uvi?appid=".$APPID."&lat=".$lat."&lon=".$lon;

    $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    if ( !$data = curl_exec($ch)) {
    	throw new Exception(curl_error($ch));
    } else {
    	curl_close($ch);
    	$file = 'UVRating_'. $cityID . '.json';
    	$file = fopen($file, "w");
    	fwrite($file, "var UVDataSingle = " . $data);
    }
    fclose($file);
}








