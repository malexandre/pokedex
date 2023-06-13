import { GetPokemonRequest } from '../../dtos/GetPokemon.request.dto';

export class GetPokemonQuery {
  constructor(public readonly getPokemonRequest: GetPokemonRequest) {}
}
