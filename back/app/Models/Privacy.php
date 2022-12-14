<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privacy extends Model
{
    protected $table = 'privacies';

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function event()
    {
        return $this->hasMany(Event::class);
    }
}
