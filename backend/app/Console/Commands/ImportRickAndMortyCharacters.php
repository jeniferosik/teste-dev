<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:import-rick-and-morty-characters')]
#[Description('Command description')]
class ImportRickAndMortyCharacters extends Command
{
    
    public function handle(RickAndMortyApiClient $apiClient) : void
    {
        $data = $apiClient->getCharactersPage(1);
        $totalPages = $data['info']['pages'];

        ImportCharactersPage::dispatch($page);

        for ($page=2; $page === $totalPages; $page++) { 
            # code...
        }
    }
}
