import { FetchPokemonsRequest } from '../../dtos/FetchPokemons.request.dto';

export class FetchPokemonsQuery {
  constructor(public readonly fetchPokemonsRequest: FetchPokemonsRequest) {}
}
