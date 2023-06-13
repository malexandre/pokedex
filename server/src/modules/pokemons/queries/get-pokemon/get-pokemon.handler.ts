import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPokemonQuery } from './get-pokemon.query';
import { GetPokemonResponse } from '../../dtos/GetPokemon.response.dto';
import { Pokemon } from '../../domain/pokemon.entity';
import { POKEMON_REPOSITORY } from '../../pokemon.di-tokens';
import { Inject } from '@nestjs/common';
import { PokemonRepositoryPort } from '../../db/pokemon.repository.port';
import { PokemonNotFoundError } from '../../domain/pokemon.errors';

@QueryHandler(GetPokemonQuery)
export class GetPokemonHandler implements IQueryHandler<GetPokemonQuery> {
  constructor(
    @Inject(POKEMON_REPOSITORY)
    private readonly pokemonRepo: PokemonRepositoryPort,
  ) {}

  async execute({
    getPokemonRequest,
  }: GetPokemonQuery): Promise<GetPokemonResponse> {
    const apiPokemon = await this.pokemonRepo.getPokemon(
      getPokemonRequest.name,
    );

    if (!apiPokemon) {
      throw new PokemonNotFoundError();
    }

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
  }
}
