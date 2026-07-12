<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\Episode;

#[Fillable(['api_id', 'name', 'status', 'type', 'species', 'gender', 'origin_location_id', 'current_location_id', 'image'])]
class Character extends Model
{
    public function episodes()
    {
        return $this->belongsToMany(Episode::class);
    }
}
