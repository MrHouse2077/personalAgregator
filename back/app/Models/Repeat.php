<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repeat extends Model
{
    protected $table = 'repeats';

    public function event()
    {
        return $this->hasMany(Event::class);
    }
}
