import React from 'react'

export function Pagination({ currentPage, totalPage, onPageClick } : { currentPage: number, totalPage: number, onPageClick: Function }) {
  const hasPreviousPage = currentPage > 0
  const hasNextPage = currentPage < totalPage - 1

  return (
    <div className="grid grid-cols-5 gap-4 mx-auto m-4 w-fit">
      <div>{ currentPage !== 0 && <a href="#" className="btn btn-secondary" onClick={() => onPageClick(0)}>First</a>}</div>
      <div>{ hasPreviousPage &&  <a href="#" className="btn btn-secondary" onClick={() => onPageClick(currentPage - 1)}>Previous</a>}</div>
      <div>Page: {currentPage + 1} / { totalPage }</div>
      <div>{ hasNextPage &&  <a href="#" className="btn btn-secondary" onClick={() => onPageClick(currentPage + 1)}>Next</a>}</div>
      <div>{ currentPage < totalPage - 1 && <a href="#" className="btn btn-secondary" onClick={() => onPageClick(totalPage - 1)}>Last</a>}</div>
    </div>
  )
}
