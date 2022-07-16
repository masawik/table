import React from 'react'
import TablePage from "./components/pages/TablePage/TablePage"
import { SampleTableProvider } from "./store/sampleTable/context"

function App() {
  return (
    <SampleTableProvider>
      <div className="container">
        <TablePage/>
      </div>
    </SampleTableProvider>
  )
}

export default App
