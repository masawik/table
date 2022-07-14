import React from 'react'

const Pagination = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="pagination">
        <li className="page-item disabled">
          <button className="page-link" tabIndex={-1}>Previous</button>
        </li>

        <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">2</button>
        </li>
        <li className="page-item">
          <button className="page-link">3</button>
        </li>

        <li className="page-item">
          <button className="page-link">Next</button>
        </li>
      </ul>

      <div>
        <form className="input-group input-group-sm">
          <label className="input-group-text" htmlFor="chooseTablePageNumberInput01">Перейти к странице</label>

          <input
            className="form-control"
            style={{ width: 60 }}

            type="number"
            placeholder="10"
            id="chooseTablePageNumberInput01"
          />

          <button className="btn btn-outline-secondary" aria-label="Перейти к выбранной странице" type="button">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Pagination
