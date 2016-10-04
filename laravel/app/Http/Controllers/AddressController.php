<?php

namespace App\Http\Controllers;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests;

class AddressController extends Controller
{	
	public function index(Request $request){
		$address=$request->input('address');
		
		$result=DB::table('place')->where('address', $address)->get();
		return view('gwcw.place', ['address'=>$address, 'db_results'=>$result, 'db_cnt'=>count($result)]);
	}
}