import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPokemonQuery } from './queries/get-pokemon/get-pokemon.query';
import { FetchPokemonsQuery } from './queries/fetch-pokemons/fetch-pokemons.query';
import { FetchPokemonsRequest } from './dtos/FetchPokemons.request.dto';
import { GetPokemonResponse } from './dtos/GetPokemon.response.dto';
import { PokemonNotFoundInterceptor } from './pokemon-not-found.interceptor';
import { FetchPokemonsResponse } from './dtos/FetchPokemons.response.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/:name')
  @UseInterceptors(PokemonNotFoundInterceptor)
  async getPokemon(@Param('name') name: string): Promise<GetPokemonResponse> {
    try {
      return this.queryBus.execute<GetPokemonQuery, GetPokemonResponse>(
        new GetPokemonQuery({ name }),
      );
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Get()
  async fetchPokemons(
    @Query() fetchPokemonsRequest: FetchPokemonsRequest,
  ): Promise<FetchPokemonsResponse[]> {
    return this.queryBus.execute<FetchPokemonsQuery, FetchPokemonsResponse[]>(
      new FetchPokemonsQuery(fetchPokemonsRequest),
    );
  }
}
