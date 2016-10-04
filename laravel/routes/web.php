<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/*
Route::get('/', function () {
   return view('welcome');
});

Route::get('test', function() {
$content='test';
   return view('test')->with('content', $content);
});

Route::get('test2/{name}', function($name) {
$content='test';
   return view('test2.'.$name)->with('name',$name);
});
*/

Route::get('/gwcw', function () {
   return view('gwcw.insert');
});

Route::get('/gwcw/place', 'AddressController@index');

Route::post('/gwcw/result', 'InsertController@index');


Route::get('/gwcw/json/places', 'PlaceController@index');

Route::get('/gwcw/json/events', 'EventController@index');

//Route::get('/gwcw/insert', InsertController@api_popup');