import React from 'react'


export function Type({ pokemonType }: { pokemonType: string }) {
  return (
    <div className={`px-4 rounded-lg shadow-lg bg-${pokemonType} capitalize text-center`}>{pokemonType}</div>
  );
}
