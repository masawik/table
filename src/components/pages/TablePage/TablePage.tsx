import React, { useCallback, useContext, useEffect } from 'react'
import Table from "../../Table/Table"
import { ESortDirections, IColumn, TSortingState } from "../../Table/Table.types"
import Pagination from "../../Pagination/Pagination"
import { TSampleTableData } from "../../../Api/Api.types"
import { SampleTableContext } from "../../../store/sampleTable/context"
import Api from "../../../Api/Api"
import { loadData, setCurrentPage, setSortDesc, setSortKey, setTotalPages } from "../../../store/sampleTable/actions"
import Filters, { EFilterTypes, TFilterOption, TOnFilterSubmitParams } from "../../Filters/Filters"

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

const filters: TFilterOption = {
  date: {
    header: 'Дата',
    filterTypes: [EFilterTypes.EQUAL, EFilterTypes.LESS, EFilterTypes.GREATER]
  },
  name: {
    header: 'Название',
    filterTypes: [EFilterTypes.EQUAL, EFilterTypes.CONTAINS]
  },
  count: {
    header: 'Количество',
    filterTypes: [EFilterTypes.EQUAL_NUMBER, EFilterTypes.LESS, EFilterTypes.GREATER]
  },
  distance: {
    header: 'Дистанция',
    filterTypes: [EFilterTypes.EQUAL_NUMBER, EFilterTypes.LESS, EFilterTypes.GREATER]
  }
}

const TablePage = () => {
  const { state, dispatch } = useContext(SampleTableContext)

  useEffect(() => {
    const fetchData = async () => {
      const { rowsPerPage, sortKey, sortDesc } = state.settings

      const result = await Api.selectData({
        page: state.pagination.currentPage,
        'per_page': rowsPerPage,
        'sort_desc': sortDesc,
        ...(sortKey && { 'sort_key': sortKey })
      })
      dispatch(loadData(result.data))

      if (result.totalPages !== state.pagination.totalPages) {
        dispatch(setTotalPages(result.totalPages))
      }
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

  const pageChangeHandler = useCallback((newPage: number) => {
    if (state.pagination.currentPage === newPage) return
    dispatch(setCurrentPage(newPage))
  }, [dispatch, state.pagination.currentPage])

  const filterHandler = (params: TOnFilterSubmitParams) => {
    console.log(params)
    alert('Не успеваю доделать фильтры')
  }

  return (
    <>
      <div className="row mb-1 mt-3">
        <Table
          data={state.data}
          columns={columns}
          onSort={sortHandler}
          caption='таблица - пример'
        />
      </div>

      <div className="row mb-2">
        <Filters filters={filters} onFilter={filterHandler}/>
      </div>

      <div className="row">
        {
          state.pagination.totalPages > 1
          &&
          <Pagination
            currentPage={state.pagination.currentPage}
            totalPages={state.pagination.totalPages}
            onPageChange={pageChangeHandler}
          />
        }
      </div>
    </>
  )
}

export default TablePage