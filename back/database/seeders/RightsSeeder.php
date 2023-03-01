<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RightsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rights')->insertOrIgnore([
            'id' => 1,
            'description' => 'Нет доступа',
        ]);
        DB::table('rights')->insertOrIgnore([
            'id' => 2,
            'description' => 'Только просмотр',
        ]);
        DB::table('rights')->insertOrIgnore([
            'id' => 3,
            'description' => 'Редактирование',
        ]);
        DB::table('rights')->insertOrIgnore([
            'id' => 4,
            'description' => 'Полный контроль',
        ]);
    }
}
