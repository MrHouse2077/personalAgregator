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
        $randomStart = Carbon::today()->subDays(mt_rand(0, 365));
        $randomEnd = $randomStart->subDays(mt_rand(0, 10));
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
