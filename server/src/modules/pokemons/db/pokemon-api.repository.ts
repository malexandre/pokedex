import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import {
  ApiPokemon,
  PokemonList,
  PokemonRepositoryPort,
} from './pokemon.repository.port';
import { PokemonNotFoundError } from '../domain/pokemon.errors';

@Injectable()
export class PokemonApi implements PokemonRepositoryPort {
  private readonly API_BASE_URL: string = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async getPokemon(pokemonName: string): Promise<ApiPokemon> {
    const endpoint = `${this.API_BASE_URL}/pokemon/${pokemonName}`;
    try {
      const request$ = this.httpService.get<ApiPokemon>(endpoint);
      const response = await lastValueFrom(request$);

      return response.data;
    } catch (e) {
      if (e.message === 'Request failed with status code 404') {
        throw new PokemonNotFoundError();
      }
      throw e;
    }
  }

  async fetchPokemons(limit: number, page: number): Promise<PokemonList> {
    const endpoint = `${this.API_BASE_URL}/pokemon`;

    const request$ = this.httpService.get<PokemonList>(endpoint, {
      params: { limit, offset: limit * (page - 1) },
    });

    const response = await lastValueFrom(request$);

    return response.data;
  }
}
