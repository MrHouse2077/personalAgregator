<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrivacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('privacies')->insert([
            'id' => 1,
            'name' => 'свободный доступ',
        ]);
        DB::table('privacies')->insert([
            'id' => 2,
            'name' => 'частичный доступ',
        ]);
        DB::table('privacies')->insert([
            'id' => 3,
            'name' => 'закрытый доступ',
        ]);
    }
}
