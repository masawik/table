import React from 'react'
import TablePage from "./components/pages/TablePage/TablePage"
import { SampleTableContext } from "./SampleTableContext/SampleTableContext"
import { ESortDirections } from "./components/Table/Table.types"

const tableSettingInitialValue = {
  itemsPerPage: 20,
  sortBy: null,
  sortDirection: ESortDirections.ASC
}

function App() {
  return (
    <SampleTableContext.Provider value={tableSettingInitialValue}>
      <div className="container">
        <TablePage/>
      </div>
    </SampleTableContext.Provider>
  )
}

export default App
