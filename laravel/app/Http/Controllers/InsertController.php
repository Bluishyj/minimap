<?php

namespace App\Http\Controllers;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests;

class InsertController extends Controller
{
	public function index(Request $request){
		echo $place_id=$request->input('place_id', "");
		echo $place_name=$request->input('place_name');
		echo $category=$request->input('category');
		echo $address=$request->input('address');
		echo $lat=$request->input('lat');
		echo $lon=$request->input('lon');
		echo $phone=$request->input('phone');
		echo $event_name=$request->input('event_name');
		echo $start_date=$request->input('start_date');
		echo $finish_date=$request->input('finish_date');
		echo $event_content=$request->input('event_content');
		
		if($place_id=="")
			$place_id = DB::table('place')->insertGetId(
					['place_name'=>$place_name, 'category'=>$category, 'address'=>$address, 'lat'=>$lat, 'lon'=>$lon, 'phone'=>$phone]);
		
		DB::table('event')->insert(
				['event_name'=>$event_name, 'place_key'=>$place_id, 'start_date'=>$start_date, 'finish_date'=>$finish_date, 'event_content'=>$event_content]);
		
		DB::table('place')->where('place_id', $place_id)->increment('event_count');
	}
}
