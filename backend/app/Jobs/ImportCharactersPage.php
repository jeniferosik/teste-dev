<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\RickAndMortyApiClient;
use App\Services\CharacterImportService;

class ImportCharactersPage implements ShouldQueue
{
    use Queueable;
 
    public function __construct(private int $page) {}
    
    public function handle(RickAndMortyApiClient $apiClient, CharacterImportService $importService): void
    {

       $data = $apiClient->getCharactersPage($this->page);
       $characters = $data['results'];

       foreach ($characters as $character) {
            $importService->importCharacter($character);
        }
    }
}
