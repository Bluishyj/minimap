<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
    	$schedule->call(function () {
	    	$ids = DB::table('event')->where('finish_date','<',date("Y-m-d"))->select('place_key')->get();
			DB::table('event')->where('finish_date','<',date("Y-m-d"))->delete();
			foreach ($ids as $id){
				DB::table('place')->where('place_id', $id->place_key)->decrement('event_count');
			}
    	})->daily();
    	
        // $schedule->command('inspire')
        //          ->hourly();
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
