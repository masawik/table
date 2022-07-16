import React, { FormEvent, useMemo, useRef } from 'react'
import cn from "classnames"
import { range } from "../../helpers/range"

const MAX_PAGE_BUTTONS_COUNT = 10

interface IPaginationProps {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}

const getNavigationButtonPlaceholder = (key: string) => (<li key={key} className="page-item disabled">
  <button aria-hidden={true} className="page-link" disabled>...</button>
</li>)

const Pagination: React.FC<IPaginationProps> =
  ({ onPageChange, currentPage, totalPages }) => {
    const fastTravelInputRef = useRef<HTMLInputElement>(null)
    const showFastTravelForm = totalPages > MAX_PAGE_BUTTONS_COUNT * 3
    const fastTravelFormSubmitHandler = (e: FormEvent) => {
      e.preventDefault()
      if (fastTravelInputRef.current) {
        onPageChange(Number(fastTravelInputRef.current.value) - 1)
      }
    }

    const $pageButtons = useMemo(() => {
      let countOfButtonsToGenerate = MAX_PAGE_BUTTONS_COUNT - 2
      let buttonRange = (MAX_PAGE_BUTTONS_COUNT / 2) - 1
      const $result: Array<JSX.Element> = []

      //check if need to crop begin buttons
      if (currentPage > buttonRange) {
        $result.push((
          <li
            key={'firstBtn'}
            onClick={onPageChange.bind(this, 0)}
            className={'page-item'}>
            <button className="page-link">{1}</button>
          </li>
        ))
        $result.push(getNavigationButtonPlaceholder('left_placeholder'))

        countOfButtonsToGenerate -= 2
        buttonRange -= 1
      }

      //check if need to crop end buttons
      const $endButtons: Array<JSX.Element> = []
      if (totalPages - currentPage > buttonRange) {
        $endButtons.push(getNavigationButtonPlaceholder('right_placeholder'))
        $endButtons.push((
          <li
            key={'lastBtn'}
            onClick={onPageChange.bind(this, totalPages)}
            className={'page-item'}>
            <button className="page-link">{totalPages + 1}</button>
          </li>
        ))
      } else {
        countOfButtonsToGenerate += 2
        buttonRange += 1
      }

      let rangeStart: number
      if (currentPage - buttonRange < 0) {
        //exclusion of negative pages
        rangeStart = 0
      } else if (currentPage + buttonRange > totalPages) {
        //exclusion of non-existent pages
        rangeStart = (totalPages + 1) - countOfButtonsToGenerate
      } else {
        rangeStart = currentPage - buttonRange
      }

      range(countOfButtonsToGenerate, rangeStart)
        .forEach(pageNumber => {
          const pageNumberView = pageNumber + 1
          $result.push((
            <li
              key={pageNumber}
              onClick={onPageChange.bind(this, pageNumber)}

              className={cn({
                'page-item': true,
                'active': currentPage === pageNumber
              })}
            >
              <button className="page-link">{pageNumberView}</button>
            </li>
          ))
        })

      $result.push(...$endButtons)
      return $result
    }, [currentPage, totalPages])

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
