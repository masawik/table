import React from 'react'
import Table from "./components/Table/Table"
import { IColumn, TSortingState } from "./components/Table/Table.types"
import { Unpacked } from "./helpers/typeHelpers"

const mockData = [
  {
    id: 1,
    russia: '34.5',
    greatBritian: '3.5',
    europe: '36',
    footLength: '23'
  },
  {
    id: 2,
    russia: '35.5',
    greatBritian: '4',
    europe: '36.⅔',
    footLength: '23–23,5'
  },
  {
    id: 3,
    russia: '36',
    greatBritian: '4.5',
    europe: '37⅓',
    footLength: '23.5'
  },
  {
    id: 4,
    russia: '36.5',
    greatBritian: '5',
    europe: '38',
    footLength: '24'
  },
]
type TData = Unpacked<typeof mockData>
const columns: IColumn<TData>[] = [
  {
    header: 'Россия',
    dataKey: 'russia',
    sortable: true
  },
  {
    header: 'Великобритания',
    dataKey: 'greatBritian',
    sortable: true
  },
  {
    header: 'Европа',
    dataKey: 'europe',
    sortable: true
  },
  {
    header: 'Длина стопы',
    dataKey: 'footLength',
  },
]

function App() {

  const sortHandler = (sortingState: TSortingState<TData>) => {
    if (sortingState) {
      console.log(sortingState)
    }
  }

  return (
    <Table
      data={mockData}
      columns={columns}
      onSort={sortHandler}
    />
  )
}

export default App
