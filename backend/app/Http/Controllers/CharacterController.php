<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CharacterResource;
use App\Models\Character;

class CharacterController extends Controller
{
    public function index()
    {        
        $characters = Character::with(['originLocation', 'currentLocation'])->paginate(20);
        return CharacterResource::collection($characters);
    }
}
