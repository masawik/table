import React, { useContext, useEffect, useState } from 'react'
import Table from "../../Table/Table"
import { IColumn, TSortingState } from "../../Table/Table.types"
import Pagination from "../../Pagination/Pagination"
import { TSampleTableData } from "../../../Api/Api.types"
import { SampleTableContext } from "../../../SampleTableContext/SampleTableContext"
import Api from "../../../Api/Api"

const columns: IColumn<TSampleTableData>[] = [
  {
    header: 'Дата',
    dataKey: 'date',
    sortable: false
  },
  {
    header: 'Название',
    dataKey: 'name',
    sortable: true
  },
  {
    header: 'Количество',
    dataKey: 'count',
    sortable: true
  },
  {
    header: 'Дистанция',
    dataKey: 'distance',
    sortable: true
  }
]

const TablePage = () => {
  const [tableData, setTableData] = useState<TSampleTableData[]>([])
  const { itemsPerPage, sortBy, sortDirection } = useContext(SampleTableContext)

  useEffect(() => {
    const fetchData = async () => {
      const result = await Api.selectData({
        page: 0,
        'per_page': 20,
        'sort_desc': true,
        'sort_key': 'count'
      })
      setTableData(result)
    }
    fetchData()
  }, [itemsPerPage, sortBy, sortDirection])

  const sortHandler = (sortingState: TSortingState<TSampleTableData>) => {
    if (sortingState) {
      console.log(sortingState)
    }
  }

  return (
    <>
      <div className="row mt-3 mb-3">
        <Table
          data={tableData}
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