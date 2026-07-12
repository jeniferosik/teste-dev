<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RickAndMortyApiClient
{
    public function getCharactersPage(int $page): array
    {
        $response = Http::get('https://rickandmortyapi.com/api/character', ['page' => $page]);
        $response->throw(); 

        return $response->json();
    }
}