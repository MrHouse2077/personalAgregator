<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $rand1=mt_rand(01, 23);
        $rand2=$rand1+2;
        $rnDate = mt_rand(01, 28);
        $randomStart = 'Mon Dec '.$rnDate.' 2022 '.$rand1.':30:00 GMT+0300 (Москва, стандартное время)';
        $randomEnd = 'Mon Dec 19 2022 '.$rand2.':30:00 GMT+0300 (Москва, стандартное время)';
        DB::table('events')->insertOrIgnore([
            'name' => Str::random(10),
            'description' => Str::random(20),
            'privacy_type_id' => mt_rand(1, 3),
            'repeat_type_id' => mt_rand(1, 5),
            'start_time' => $randomStart,
            'end_time' => $randomEnd,
            'success' => mt_rand(0, 1),
        ]);
        
    }
}
