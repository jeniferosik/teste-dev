<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EpisodeResource extends JsonResource
{    
    public function toArray(Request $request): array
    {
        return [
            'api_id' => $this->api_id,
            'url' => $this->url,
        ];
    }
}
