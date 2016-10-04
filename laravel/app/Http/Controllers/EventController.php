<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;

class EventController extends Controller
{
	public function index(Request $request){
		$id=$request->input('id');
		$events=DB::table('event')->where('place_key', $id)->get();
		
		return response()->json($events);
	}
}
