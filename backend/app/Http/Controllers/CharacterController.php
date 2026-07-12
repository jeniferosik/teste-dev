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

    public function show($api_id)
    {        
        $character = Character::where('api_id', $api_id)
            ->with(['originLocation', 'currentLocation'])
            ->first();

        if ($character === null){            
            return response()
            ->json(['message' => 'Character not found.'], 404);    
        }
        

        return new CharacterResource($character);
    }
}
