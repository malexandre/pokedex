export type ApiPokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type PokemonList = {
  count: number;
  results: { name: string }[];
};

export interface PokemonRepositoryPort {
  getPokemon(pokemonName: string): Promise<ApiPokemon>;
  fetchPokemons(limit: number, page: number): Promise<PokemonList>;
}
