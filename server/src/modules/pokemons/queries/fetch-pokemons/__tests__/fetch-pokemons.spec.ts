import {
  ApiPokemon,
  PokemonList,
  PokemonRepositoryPort,
} from '../../../db/pokemon.repository.port';
import * as pokemonsData from '../../__tests__/pokemons-data.json';
import { FetchPokemonsHandler } from '../fetch-pokemons.handler';

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

describe('Testing fetch pokemons query', () => {
  const handler = new FetchPokemonsHandler(new RepoMock());

  test('Fetch 5 first pokemons', async () => {
    const results = await handler.execute({
      fetchPokemonsRequest: { limit: 5, page: 0 },
    });

    expect(results.count).toBe(5);
    expect(results.pokemons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'bulbasaur' }),
        expect.objectContaining({ name: 'ivysaur' }),
        expect.objectContaining({ name: 'venusaur' }),
        expect.objectContaining({ name: 'charmander' }),
        expect.objectContaining({ name: 'charmeleon' }),
      ]),
    );
  });

  test('Fetch the next 5 pokemons', async () => {
    const results = await handler.execute({
      fetchPokemonsRequest: { limit: 5, page: 1 },
    });

    expect(results.count).toBe(5);
    expect(results.pokemons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'charizard' }),
        expect.objectContaining({ name: 'squirtle' }),
        expect.objectContaining({ name: 'wartortle' }),
        expect.objectContaining({ name: 'blastoise' }),
        expect.objectContaining({ name: 'caterpie' }),
      ]),
    );
  });

  test('Fetch more than available', async () => {
    const results = await handler.execute({
      fetchPokemonsRequest: { limit: 25, page: 0 },
    });

    expect(results.count).toBe(20);
  });

  test('Fetch empty page', async () => {
    const results = await handler.execute({
      fetchPokemonsRequest: { limit: 5, page: 5 },
    });

    expect(results.count).toBe(0);
  });
});
