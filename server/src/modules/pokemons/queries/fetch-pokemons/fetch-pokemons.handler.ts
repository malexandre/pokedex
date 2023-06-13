import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchPokemonsQuery } from './fetch-pokemons.query';
import { FetchPokemonsResponse } from '../../dtos/FetchPokemons.response.dto';
import { Pokemon } from '../../domain/pokemon.entity';
import { Inject } from '@nestjs/common';
import { POKEMON_REPOSITORY } from '../../pokemon.di-tokens';
import { PokemonRepositoryPort } from '../../db/pokemon.repository.port';

@QueryHandler(FetchPokemonsQuery)
export class FetchPokemonsHandler implements IQueryHandler<FetchPokemonsQuery> {
  constructor(
    @Inject(POKEMON_REPOSITORY)
    private readonly pokemonRepo: PokemonRepositoryPort,
  ) {}

  async execute({
    fetchPokemonsRequest,
  }: FetchPokemonsQuery): Promise<FetchPokemonsResponse> {
    const apiFetch = await this.pokemonRepo.fetchPokemons(
      fetchPokemonsRequest.limit,
      fetchPokemonsRequest.page,
    );

    const promisePokemons = apiFetch.results.map(async ({ name }) =>
      this.pokemonRepo.getPokemon(name),
    );
    const pokemons = await Promise.all(promisePokemons);

    return {
      count: apiFetch.count,
      pokemons: pokemons.map((apiPokemon) => {
        const domainPokemon = new Pokemon(
          apiPokemon.name,
          apiPokemon.sprites,
          apiPokemon.types,
        );

        return {
          name: domainPokemon.getName(),
          imageUrl: domainPokemon.getFrontSprite(),
          types: domainPokemon.getTypes(),
        };
      }),
    };
  }
}
