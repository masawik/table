import React, { useMemo, useState } from 'react'
import { TDataWithId } from "../Table/Table.types"
import { ESortDirections, ISortableTableProps, TSortingState } from "./SortableTable.types"
import Table from "../Table/Table"

function SortableTable<T extends TDataWithId>(props: ISortableTableProps<T>) {
  const [sortingState, setSortingState] = useState<TSortingState<T>>(null)


  const sortHandler = (dataKey: string) => {
    setSortingState(prevState => {
      const sameColumn = prevState?.dataKey === dataKey

      if (!prevState || !sameColumn) {
        return { dataKey: dataKey, direction: ESortDirections.ASC }
      } else if (sameColumn && prevState.direction === ESortDirections.ASC) {
        return { ...prevState, direction: ESortDirections.DESC }
      } else {
        return null
      }
    })
  }

  //todo возможно, изменять пропсы - не лучшая идея
  const newColumns = useMemo(() => props.columns.map(columnItem => {
    columnItem = { ...columnItem }
    if (!columnItem.sortable) return columnItem

    console.log(columnItem)

    // @ts-ignore
    columnItem.header = (<button type={'button'} onClick={sortHandler.bind(this, String(columnItem.dataKey))}>
        {columnItem.header}
      </button>
    )
    return columnItem
  }), [props.columns])

  return (
    <Table columns={newColumns} data={props.data}/>
  )
}

export default SortableTable