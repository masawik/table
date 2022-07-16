import React, { FormEvent, useRef } from 'react'
import cn from "classnames"

const MAX_PAGE_BUTTONS_COUNT = 10

interface IPaginationProps {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}

const Pagination: React.FC<IPaginationProps> =
  ({ onPageChange, currentPage, totalPages }) => {

    const fastTravelInputRef = useRef<HTMLInputElement>(null)
    const showFastTravelForm = totalPages > MAX_PAGE_BUTTONS_COUNT * 2
    const fastTravelFormSubmitHandler = (e: FormEvent) => {
      e.preventDefault()
      if (fastTravelInputRef.current) {
        onPageChange(Number(fastTravelInputRef.current.value) - 1)
      }
    }

    const $pageButtons = new Array(Math.min(MAX_PAGE_BUTTONS_COUNT - 2, totalPages))
      .fill(null)
      .map((_, index) => {
        const pageNumber = index
        const pageNumberView = index + 1

        return (
          <li
            key={index}
            onClick={onPageChange.bind(this, pageNumber)}

            className={cn({
              'page-item': true,
              'active': currentPage === pageNumber
            })}
          >
            <button className="page-link">{pageNumberView}</button>
          </li>
        )
      })

    //add placeholder and last page button
    if (totalPages > MAX_PAGE_BUTTONS_COUNT) {
      $pageButtons.push((
        <li key="btn-placeholder" className="page-item disabled">
          <button aria-hidden={true} className="page-link" disabled>...</button>
        </li>
      ))

      $pageButtons.push((
        <li
          key={'lastBtn'}
          onClick={onPageChange.bind(this, totalPages)}
          className={'page-item'}>
          <button className="page-link">{totalPages}</button>
        </li>
      ))
    }

    return (
      <div className="d-flex flex-column align-items-center">
        <ul className="pagination">
          <li
            className={
              cn({
                'page-item': true,
                'disabled': currentPage === 0
              })
            }
          >
            <button
              onClick={onPageChange.bind(this, currentPage - 1)}
              className="page-link"
              tabIndex={-1}
            >Previous
            </button>
          </li>

          {$pageButtons}

          <li
            className={
              cn({
                'page-item': true,
                'disabled': currentPage === totalPages
              })
            }
          >
            <button
              onClick={onPageChange.bind(this, currentPage + 1)}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>

        {
          showFastTravelForm &&
          (
            <div>
              <form onSubmit={fastTravelFormSubmitHandler} className="input-group input-group-sm">
                <label className="input-group-text" htmlFor="chooseTablePageNumberInput01">Перейти к странице</label>

                <input
                  ref={fastTravelInputRef}
                  type="number"
                  placeholder="10"
                  id="chooseTablePageNumberInput01"
                  min={1}
                  max={totalPages}

                  className="form-control"
                  style={{ width: 60 }}
                />

                <button className="btn btn-outline-secondary" aria-label="Перейти к выбранной странице" type="submit">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </form>
            </div>
          )
        }

      </div>
    )
  }

export default Pagination
