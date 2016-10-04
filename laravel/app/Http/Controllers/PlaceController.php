<?php

namespace App\Http\Controllers;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests;

class PlaceController extends Controller
{	
	public function index(){
		$events=DB::table('place')->where('event_count','>','0')->get();
		
		return response()->json($events);
	}
}