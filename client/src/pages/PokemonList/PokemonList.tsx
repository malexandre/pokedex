import React, { useState, useEffect } from 'react'
import { PerPage } from './PerPage'
import { Pagination } from './Pagination'

interface Pokemon {
  name: string
  imageUrl: string
  types: string[]
}

export function PokemonList({ selectPokemon, hidden }: { selectPokemon: Function, hidden: boolean }) {
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPokemons = (fetchPerPage: number, fetchCurrentPage: number) => {
    fetch(`http://localhost:3000/pokemons?limit=${fetchPerPage}&page=${fetchCurrentPage + 1}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTotalPage(Math.ceil(data.count / perPage))
        setPokemons(data.pokemons)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchPokemons(perPage, currentPage)
  }, [])

  function handlePerPageUpdate(newPerPage: number) {
    setPerPage(newPerPage)
    setCurrentPage(0)
    setIsLoading(true)
    fetchPokemons(newPerPage, 0)
  }

  function handleNewPage(newPage: number) {
    setCurrentPage(newPage)
    setIsLoading(true)
    fetchPokemons(perPage, newPage)
  }

  return (
    <div>
      { !hidden && (
        <div>
          <PerPage currentPerPage={perPage} onPerPageClick={handlePerPageUpdate} />

          {isLoading && <div className="mx-auto text-center">Loading...</div>}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mx-auto mt-4 w-fit">
            {!isLoading && pokemons.map((pokemon) => (
              <div
                className="p-6 w-100 mx-auto bg-white rounded-xl shadow-lg border-solid border-slate-200 border cursor-pointer"
                onClick={() => selectPokemon(pokemon)}
              >
                <img className="w-24 h-24" src={pokemon.imageUrl} alt={ `${pokemon.name}'s sprite` } />
                <div className="text-center truncate w-24" title={pokemon.name}>{pokemon.name}</div>
                {/* <a href="#" onClick={() => selectPokemon(pokemon)}>{pokemon.name}</a> */}
              </div>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPage={totalPage} onPageClick={handleNewPage} />
        </div>
      )}
    </div>
  )
}
