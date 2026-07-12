<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\Episode;
use App\Models\Location;

#[Fillable(['api_id', 'name', 'status', 'type', 'species', 'gender', 'origin_location_id', 'current_location_id', 'image'])]
class Character extends Model
{
    public function episodes()
    {
        return $this->belongsToMany(Episode::class);
    }

    public function originLocation()
    {
        return $this->belongsTo(Location::class, 'origin_location_id');
    }

    public function currentLocation()
    {
        return $this->belongsTo(Location::class, 'current_location_id');
    }
}
