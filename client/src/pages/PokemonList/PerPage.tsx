import React from 'react'

export function PerPage({ currentPerPage, onPerPageClick }: { currentPerPage: number, onPerPageClick: Function }) {
  const perPageValues = [6, 12, 24, 48, 96]

  return (
    <div className="text-center mb-4">
      Number of Pokémon per page:
      <div className="grid grid-cols-5 w-fit gap-4 mx-auto mt-4">
        { perPageValues.map((value) => (
          <div className="text-center" key={`per-page-${value}`}>
            <a
              href="#"
              className={ `btn btn-secondary ${value == currentPerPage ? "underline" : ""}`}
              onClick={() => onPerPageClick(value)}
            >
              {value}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
