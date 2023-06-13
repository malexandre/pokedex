import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { PokemonDetail } from "./PokemonDetail/PokemontDetail"
import { PokemonList } from "./PokemonList/PokemonList"

const IndexPage: React.FC<PageProps> = () => {
  const [pokemonSelected, selectPokemon] = React.useState(null)

  return (
    <main className="container mx-auto p-4 bg-white min-h-screen">
      {pokemonSelected && <PokemonDetail pokemon={pokemonSelected} onExit={() => selectPokemon(null)} />}
      <PokemonList selectPokemon={ selectPokemon } hidden={ !!pokemonSelected } />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
