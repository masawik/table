import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './Table.module.css'
import { ESortDirections, ITableProps, TColumnOrderState, TDataWithId, TSortingState } from "./Table.types"


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

      //todo remove this shame
      let thClassNames = ''
      if (column.sortable) thClassNames += ` ${styles.sortable}`
      if (sortingState?.dataKey === column.dataKey) {
        if (sortingState.direction === ESortDirections.ASC) {
          thClassNames += ` ${styles.sortedAsc}`
        } else thClassNames += ` ${styles.sortedDesc}`
      }

      return (
        <th
          className={thClassNames}
          key={dataKeyString}
          onClick={column.sortable ? () => sortHandler(dataKeyString) : undefined}
        >
          {column.header}
        </th>
      )
    })

    return (
      <tr>{$thList}</tr>
    )
  }, [props.columns, sortingState])

  const $TableBodyRows = useMemo(() =>
    props.data.map(dataItem => {
      const $tdList = columnOrderRef.current.map(dataKey => (
        <td key={`${dataItem.id}_${String(dataKey)}`}>
          {dataItem[dataKey]}
        </td>
      ))

      return (
        <tr key={dataItem.id}>
          {$tdList}
        </tr>
      )
    }), [props.data])

  return (
    <table className={styles.table}>
      <caption>Таблица размеров обуви</caption>

      <thead>{$TableHeaderRow}</thead>
      <tbody>{$TableBodyRows}</tbody>
    </table>
  )
}

export default Table