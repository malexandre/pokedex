import React from 'react'
import { Type } from '../Type/Type';

export function PokemonDetail({ pokemon, onExit }: { pokemon: {
    name: string,
    imageUrl: string,
    types: string[]
  }, onExit: Function
}) {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg mb-4">
      <div className="text-center">
        <a href="#" className="btn btn-blue" onClick={() => onExit()}>Go Back</a>
      </div>
      <div className="flex items-center space-x-4 space-y-4">
        <div className="w-1/2">
          <img className="w-full" src={pokemon.imageUrl} alt={ `${pokemon.name}'s sprite` } />
        </div>
        <div className="w-1/2 self-start">
          <div className="text-xl font-medium text-black capitalize mb-4">{pokemon.name}</div>
          <div className="grid-cols-2 grid gap-4">
            {pokemon.types.map((type) => <Type pokemonType={type} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
