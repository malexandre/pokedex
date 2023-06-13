import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PokemonApi } from './db/pokemon-api.repository';
import { PokemonQueryHandlers } from './queries';
import { PokemonsController } from './pokemons.controller';
import { HttpModule } from '@nestjs/axios';
import { POKEMON_REPOSITORY } from './pokemon.di-tokens';

const repositories: Provider[] = [
  { provide: POKEMON_REPOSITORY, useClass: PokemonApi },
];

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [PokemonsController],
  providers: [...repositories, ...PokemonQueryHandlers],
})
export class PokemonsModule {}
