<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ant extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'photo_url', 'latitude', 'longitude', 'user_id', 'created_at','action'
    ];

    public function users()
    {
        return $this->belongsTo('App\User');
    }
    
}