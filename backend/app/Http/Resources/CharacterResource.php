<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CharacterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'api_id' => $this->api_id,
            'name' => $this->name,
            'status' => $this->status,
            'type' => $this->type,
            'species' => $this->species,
            'gender' => $this->gender,
            'image' => $this->image,
            'origin' => new LocationResource($this->originLocation),
            'current_location' => new LocationResource($this->currentLocation), 
        ];
    }
}
