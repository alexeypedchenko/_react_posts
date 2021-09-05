import React from 'react'
import { getPagesArray } from '../../../utils/pages'

const MyPagination = ({totalPages, page, changePage}) => {
  const pagesArray = getPagesArray(totalPages)
  return (
    <div>
      <div className="pagination" style={{marginTop: 20}}>
        {pagesArray.map((p) =>
          <span
            className={`pagination__item ${p === page ? 'pagination__item--current' : '' }`}
            key={p}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        )}
      </div>
    </div>
  )
}

export default MyPagination
