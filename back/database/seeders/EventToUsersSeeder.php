<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EventToUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {    
        DB::table('events_users')->insertOrIgnore([
            'user_id' => mt_rand(2, 3),
            'event_id' => mt_rand(1, 13),

        ]);
        ,DB::table('events_users')->insertOrIgnore([
            'user_id' => mt_rand(2, 3),
            'event_id' => mt_rand(1, 13),

        ]);
        
    }
}