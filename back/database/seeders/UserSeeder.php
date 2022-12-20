<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   

        DB::table('users')->insertOrIgnore([
            'name' => 'admin',
            'login' => 'adminN1',
            'email' => 'admin@mail.com',
            'password' => Hash::make(12345),
            'privacy' => 1,
            'role' => 1,
        ]);
        
    }
}
