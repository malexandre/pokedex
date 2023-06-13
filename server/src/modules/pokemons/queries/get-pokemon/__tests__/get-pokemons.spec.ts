import {
  ApiPokemon,
  PokemonList,
  PokemonRepositoryPort,
} from '../../../db/pokemon.repository.port';
import * as pokemonsData from '../../__tests__/pokemons-data.json';
import { GetPokemonHandler } from '../get-pokemon.handler';
import { PokemonNotFoundError } from '../../../domain/pokemon.errors';

class RepoMock implements PokemonRepositoryPort {
  async fetchPokemons(limit: number, page: number): Promise<PokemonList> {
    const start = limit * page;
    const end = start + limit;
    const results = pokemonsData.results.slice(start, end);

    return {
      count: pokemonsData.results.slice(start, end).length,
      results,
    };
  }

  async getPokemon(pokemonName: string): Promise<ApiPokemon> {
    return pokemonsData.results.find((pokemon) => pokemon.name === pokemonName);
  }
}

describe('Testing get pokemon query', () => {
  const handler = new GetPokemonHandler(new RepoMock());

  test('Get charmander', async () => {
    const result = await handler.execute({
      getPokemonRequest: { name: 'charmander' },
    });

    expect(result.name).toBe('charmander');
    expect(result.imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    );
    expect(result.types.length).toBe(1);
    expect(result.types).toContain('fire');
  });

  test('Get charizard', async () => {
    const result = await handler.execute({
      getPokemonRequest: { name: 'charizard' },
    });

    expect(result.name).toBe('charizard');
    expect(result.imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    );
    expect(result.types.length).toBe(2);
    expect(result.types).toContain('fire');
    expect(result.types).toContain('flying');
  });

  test('Get pikachu (not existing in the test datas)', async () => {
    expect(
      handler.execute({
        getPokemonRequest: { name: 'pikachu' },
      }),
    ).rejects.toBeInstanceOf(PokemonNotFoundError);
  });
});
