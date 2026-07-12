<?php

namespace App\Services;

use App\Models\Location;
use App\Models\Episode;
use App\Models\Character;

class CharacterImportService
{
    public function __construct(){}
   
    public function resolveLocation(array $locationData): int
    {
        if ($locationData['url'] === "") {
            $location = Location::firstOrCreate([
                'name' => 'unknown',
                'url' => null,
            ]);
        }
        else {
            $location = Location::firstOrCreate(
                ['url' => $locationData['url']],
                ['name' => $locationData['name']]
            );
        }

        return $location->id;
    }

    public function resolveEpisode(array $episodeUrls): array
    {
        
        $episodeIds = [];

        foreach ($episodeUrls as $url) {
            $apiId = (int) basename($url);
            $episode = Episode::firstOrCreate(
                ['url' => $url],
                ['api_id' => $apiId]
            );

            $episodeIds[] = $episode->id;
        }


        return $episodeIds;
    }

    public function importCharacter(array $characterData): void
    {
        $originId = $this-> resolveLocation($characterData['origin']);
        $currentLocationId = $this-> resolveLocation($characterData['location']);       
    
        $character = Character::updateOrCreate(
            [
                'api_id' => $characterData['id']                
            ],
            [   
                'name' => $characterData['name'],
                'status' => $characterData['status'],
                'type' => $characterData['type'],
                'species' => $characterData['species'],
                'gender' => $characterData['gender'],
                'origin_location_id' => $originId,
                'current_location_id' => $currentLocationId,
                'image' => $characterData['image']
            ]
        );     
        
        $episodeIds = $this->resolveEpisode($characterData['episode']);
        $character->episodes()->sync($episodeIds);
    }   
}
