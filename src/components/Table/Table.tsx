import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ESortDirections, ITableProps, TColumnOrderState, TDataWithId, TSortingState } from "./Table.types"
import styles from './Table.module.css'
import cn from 'classnames'

//todo добавить лоадер

function Table<T extends TDataWithId>(props: ITableProps<T>) {
  const [sortingState, setSortingState] = useState<TSortingState<T>>(null)

  const sortHandler = (dataKey: string) => {
    setSortingState(prevState => {
      const sameColumn = prevState?.dataKey === dataKey

      //todo упростить
      if (!prevState || !sameColumn) {
        return { dataKey: dataKey, direction: ESortDirections.ASC }
      } else if (sameColumn && prevState.direction === ESortDirections.ASC) {
        return { ...prevState, direction: ESortDirections.DESC }
      } else {
        return null
      }
    })
  }

  useEffect(() => {
    if (!props.onSort) return
    //todo add debounce
    props.onSort(sortingState)
  }, [sortingState])

  const columnOrderRef = useRef<TColumnOrderState<T>>([])

  //   ----- rendering below -----
  const $TableHeaderRow = useMemo(() => {
    columnOrderRef.current.length = 0 //clear column order array

    const $thList = props.columns.map(column => {
      columnOrderRef.current.push(column.dataKey)

      const dataKeyString = String(column.dataKey)

      const isThisColumnSorted = sortingState?.dataKey === column.dataKey
      const isSortDirectionAsc = sortingState?.direction === ESortDirections.ASC

      return (
        <th
          key={dataKeyString}
          className={cn({
            [`text-success ${styles.sortableThAsc}`]: isThisColumnSorted && isSortDirectionAsc,
            [`text-danger ${styles.sortableThDesc}`]: isThisColumnSorted && !isSortDirectionAsc,
            [`btn-link ${styles.sortableTh}`]: column.sortable
          })}

          {...(column.sortable && {
              role: "button",
              onClick: () => sortHandler(dataKeyString)
            }
          )}
        >
          {column.header}
        </th>
      )
    })

    return (
      <tr className="table-primary">{$thList}</tr>
    )
  }, [props.columns, sortingState])

  const $TableBodyRows = useMemo(() => props.data.map(dataItem => {
    const $tdList = columnOrderRef.current.map(dataKey => (
      <td key={`${dataItem.id}_${String(dataKey)}`}>
        {String(dataItem[dataKey])}
      </td>
    ))

    return (
      <tr key={dataItem.id}>
        {$tdList}
      </tr>
    )
  }), [props.data])

  return (
    <table className="table table-light table-hover table-bordered caption-top text-center">
      <caption>{props.caption}</caption>

      <thead>{$TableHeaderRow}</thead>
      <tbody className="table-group-divider">{$TableBodyRows}</tbody>
    </table>
  )
}

export default Table