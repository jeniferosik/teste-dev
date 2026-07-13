# The Multiverse Ledger — Rick and Morty Character Browser

Aplicação full-stack para navegar, filtrar e explorar os personagens de Rick and Morty, desenvolvida como teste técnico para a Inffus.

- **Backend:** Laravel 13 + MySQL, consumindo a [API pública do Rick and Morty](https://rickandmortyapi.com/) e disponibilizando endpoints próprios, com filtragem e paginação.
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS, consumindo a API própria.

---

## Sumário

- [Stack técnica](#stack-técnica)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Funcionalidades](#funcionalidades)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Diferenciais implementados](#diferenciais-implementados)
- [Limitações conhecidas](#limitações-conhecidas)

---

## Stack técnica

**Backend**
- PHP 8.3 / Laravel 13
- MySQL 8 (via Docker)
- Jobs assíncronos (fila `database`) para importação de dados
- API Resources para formatação de resposta

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Server Components para busca de dados, Client Components isolados onde há interatividade

---

## Como rodar o projeto

### Pré-requisitos

- PHP 8.3+ e Composer
- Node.js 18+ e npm
- Docker e Docker Compose

### 1. Clonar e subir o banco de dados

```bash
git clone <url-do-fork>
cd teste-dev
docker compose up -d
```

Isso sobe um container MySQL 8, já configurado com o banco `db_rickmorty` e o usuário `rickmorty`.

### 2. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edita o `.env` para apontar para o banco do container:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_rickmorty
DB_USERNAME=rickmorty
DB_PASSWORD=<mesma senha definida no docker-compose.yml>
```

Roda as migrations:

```bash
php artisan migrate
```

Importa os dados da API do Rick and Morty (assíncrono, via fila — pode levar alguns minutos por causa de rate limiting da API externa):

```bash
php artisan app:import-rick-and-morty-characters
```

Em um terminal separado, processa a fila de importação:

```bash
php artisan queue:work
```

Sobe o servidor:

```bash
php artisan serve
```

A API fica disponível em `http://127.0.0.1:8000/api`.

### 3. Frontend (Next.js)

Em outro terminal:

```bash
cd frontend
npm install
```

Cria um arquivo `.env.local` na raiz de `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

> Importante: usar `127.0.0.1`, não `localhost` — evita um problema conhecido de latência na resolução de DNS entre Node.js e ambientes como WSL.

Sobe o servidor de desenvolvimento:

```bash
npm run dev
```

Acessa `http://localhost:3000` (redireciona automaticamente para `/characters`).

---

## Endpoints da API

### `GET /api/characters`

Listagem paginada (20 itens por página), com filtros via query string:

| Parâmetro | Tipo de busca | Exemplo |
|---|---|---|
| `name` | parcial | `?name=rick` |
| `species` | parcial | `?species=human` |
| `status` | exato (`Alive`, `Dead`, `unknown`) | `?status=Alive` |
| `gender` | exato (`Male`, `Female`, `Genderless`, `unknown`) | `?gender=Male` |
| `originLocation` | parcial, pelo nome da location | `?originLocation=earth` |
| `currentLocation` | parcial, pelo nome da location | `?currentLocation=citadel` |
| `page` | número da página | `?page=2` |

Filtros são combináveis (`AND` entre eles).

### `GET /api/characters/{api_id}`

Detalhe de um personagem específico (identificado pelo `api_id`, não pelo `id` interno do banco). Retorna `404` com `{"message": "Character not found."}` se não existir.

---

## Funcionalidades

- Listagem paginada de personagens com informações simplificadas (nome, imagem, status, espécie)
- Página de detalhe individual, com informações completas
- Filtros combináveis por nome, espécie, status, gênero, origem e localização atual
- Interface totalmente responsiva
- Animação temática de transição ao navegar da listagem para o detalhe

---

## Decisões de arquitetura

### Backend

- **Importação assíncrona via Jobs**: um Job por página da API externa (não por personagem individual, nem tudo num Job só), com delay incremental entre despachos para evitar rate limiting (erro 429) da API pública.
- **Modelagem relacional normalizada**: `characters`, `locations`, `episodes`, com tabela pivot `character_episode` para a relação N:N. `origin_location_id`/`current_location_id` como foreign keys diretas em `characters` (relação 1:N, não justifica pivot).
- **API Resources** para desacoplar o formato de resposta da estrutura interna do banco — nenhum ID interno ou coluna crua é exposto diretamente.
- **Eager loading** (`with()`) em todas as consultas que envolvem relacionamentos, evitando o problema de N+1 queries.
- **Filtros com operador ajustado ao tipo de dado**: `LIKE` para campos de texto livre (nome, espécie, locations), `=` para campos com conjunto fixo de valores (status, gênero).

### Frontend

- **Server Components por padrão**, `"use client"` apenas onde há necessidade real de interatividade (formulário de filtros, animação de clique, retry de imagem) — minimizando JavaScript enviado ao navegador.
- **Camada de serviço** (`services/characters.ts`) entre as páginas e o cliente HTTP genérico (`lib/api.ts`), desacoplando a UI de detalhes de implementação da API.
- **Estado dos filtros sincronizado com a URL** (`useFilters`), tornando qualquer combinação de filtro compartilhável via link e navegável pelo histórico do navegador.
- **Debounce** nos filtros de texto (400ms) para evitar disparo de requisição a cada tecla digitada.

---

## Diferenciais implementados

- ✅ TypeScript (frontend)
- ✅ TailwindCSS
- ✅ MySQL (via Docker, com `docker-compose.yml` na raiz do projeto)
- ✅ Cache de requisições (cache automático do Next.js em Server Components para dados que não dependem de parâmetros dinâmicos de sessão)
- ✅ Funcionalidade adicional: animação temática de transição entre listagem e detalhe, com identidade visual baseada na paleta de cores do portal da série
- ✅ Funcionalidade adicional: retry com backoff exponencial para carregamento de imagens, mitigando rate limiting da API externa de imagens
- ⬜ Testes automatizados (não implementados — priorização consciente diante do prazo, focando em cobertura funcional completa do requisito principal)

---

## Limitações conhecidas

**Locations sem residentes não são importadas.** O total de locations no banco (122) é ligeiramente menor que o total da API oficial (126). Isso ocorre porque locations são importadas de forma derivada — a partir dos campos `origin` e `location` de cada personagem — em vez de consultar diretamente o endpoint `/location` da API externa. As 4 locations ausentes (ex: "Rick's Consciousness", "Blips and Chitz") não são origem nem localização atual de nenhum personagem, portanto nunca são referenciadas pelo fluxo de importação atual. Essa é uma limitação de design consciente, não um bug.

**Episódios não são exibidos na interface.** A modelagem de dados para episódios (relacionamento N:N com personagens) foi implementada no backend e é exposta no endpoint de detalhe da API (`GET /api/characters/{api_id}`), mas não é exibida na interface do frontend — o payload da API do Rick and Morty não inclui o número da temporada/episódio de forma direta (apenas a URL do episódio), o que exigiria consumir também o endpoint `/episode` para enriquecer essa informação, fora do escopo de tempo do teste.