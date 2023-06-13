export class PokemonNotFoundError extends Error {
  static readonly code = 'POKEMON.NOT_FOUND';

  constructor() {
    super('Pokemon not found');
  }
}
