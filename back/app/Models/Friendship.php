<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privacy extends Model
{
    protected $table = 'friendships';
    public $timestamps = false;
    public function user()
    {
        return $this->hasMany(User::class);
    }

    
}