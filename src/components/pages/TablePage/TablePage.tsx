import React from 'react'
import Table from "../../Table/Table"
import { IColumn, TSortingState } from "../../Table/Table.types"
import { Unpacked } from "../../../helpers/typeHelpers"
import Pagination from "../../Pagination/Pagination"

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

const TablePage = () => {

  const sortHandler = (sortingState: TSortingState<TData>) => {
    if (sortingState) {
      console.log(sortingState)
    }
  }

  return (
    <>
      <div className="row mt-3 mb-3">
        <Table
          data={mockData}
          columns={columns}
          onSort={sortHandler}
        />
      </div>
      <div className="row">
        {/*<div className="d-flex justify-content-center">*/}
          <Pagination/>
        {/*</div>*/}
      </div>
    </>
  )
}

export default TablePage