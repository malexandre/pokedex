export class FetchPokemonsResponse {
  count: number;
  pokemons: {
    name: string;
    imageUrl: string;
    types: string[];
  }[];
}
