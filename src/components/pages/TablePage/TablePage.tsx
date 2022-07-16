import React, { useContext, useEffect } from 'react'
import Table from "../../Table/Table"
import { ESortDirections, IColumn, TSortingState } from "../../Table/Table.types"
import Pagination from "../../Pagination/Pagination"
import { TSampleTableData } from "../../../Api/Api.types"
import { SampleTableContext } from "../../../store/sampleTable/context"
import Api from "../../../Api/Api"
import { loadData, setSortDesc, setSortKey, setTotalPages } from "../../../store/sampleTable/actions"

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
  const { state, dispatch } = useContext(SampleTableContext)

  useEffect(() => {
    const fetchData = async () => {
      const { rowsPerPage, sortKey, sortDesc } = state.settings

      const result = await Api.selectData({
        page: 0,
        'per_page': rowsPerPage,
        'sort_desc': sortDesc,
        ...(sortKey && { 'sort_key': sortKey })
      })
      dispatch(loadData(result.data))
      dispatch(setTotalPages(result.totalPages))
    }
    fetchData()
  }, [dispatch, state.settings, state.pagination.currentPage])

  const sortHandler = (sortingState: TSortingState<TSampleTableData>) => {
    if (sortingState) {
      dispatch(setSortKey(sortingState.dataKey))
      const isSortDesc = sortingState.direction === ESortDirections.DESC
      dispatch(setSortDesc(isSortDesc))
    }
  }

  return (
    <>
      <div className="row mt-3 mb-3">
        <Table
          data={state.data}
          columns={columns}
          onSort={sortHandler}
        />
      </div>

      <div className="row">
        {/*<div className="d-flex justify-content-center">*/}
        {
          state.pagination.totalPages > 1
          && <Pagination/>
        }
        {/*</div>*/}
      </div>
    </>
  )
}

export default TablePage