<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user', 'user_id', 'event_id');
    }

    public function privacies()
    {
        return $this->belongsTo(Privacy::class, 'privacy_type_id');
    }

    public function repeats()
    {
        return $this->belongsTo(Privacy::class, 'repeat_type_id');
    }
}
