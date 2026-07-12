<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CharacterResource;
use App\Models\Character;

class CharacterController extends Controller
{
    public function index(Request $request)
    {    
        $query = Character::with(['originLocation', 'currentLocation']);

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('species')) {
            $query->where('species', 'like', '%' . $request->species . '%');
        }
       
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->has('originLocation'))
        {   
            $origin = $request->originLocation;

            $query->whereHas('originLocation', function ($q) use ($origin) {
                $q->where('name', 'like', '%' . $origin . '%');
            });
        };

        if ($request->has('currentLocation'))
        {   
            $location = $request->currentLocation;

            $query->whereHas('currentLocation', function ($q) use ($location) {
                $q->where('name', 'like', '%' . $location . '%');
            });
        };        

        $characters = $query->paginate(20);

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
