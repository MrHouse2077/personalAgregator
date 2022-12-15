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
        $randmail = Str::random(6);
        $endmail = '@mail.com';
        DB::table('users')->insertOrIgnore([
            'name' => Str::random(10),
            'login' => Str::random(5),
            'email' => $randmail.''.$endmail,
            'password' => Hash::make(12345),
            'privacy' => 1,
            'role' => 2
        ]);
        
    }
}
