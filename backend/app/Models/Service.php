<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
   protected $fillable = [
    'name', 'type', 'category', 'payment', 'duration', 'price',
    'description', 'gender', 'child_age', 'elder_age', 'date', 'time' // Pastikan ini ada!
];
}
