<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RepeatTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('repeats')->insertOrIgnore([
            'id' => 1,
            'type' => 'единично',
            
        ]);
        DB::table('repeats')->insertOrIgnore([
            'id' => 2,
            'type' => 'ежедневно',
            
        ]);
        DB::table('repeats')->insertOrIgnore([
            'id' => 3,
            'type' => 'еженедельно',
            
        ]);
        DB::table('repeats')->insertOrIgnore([
            'id' => 4,
            'type' => 'ежемесячно',
            
        ]);
        DB::table('repeats')->insertOrIgnore([
            'id' => 5,
            'type' => 'ежегодно',
            
        ]);
    }
}
