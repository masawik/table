import React, { useMemo, useRef } from 'react'
import styles from './Table.module.css'
import { ITableProps, TColumnOrderState, TDataWithId } from "./Table.types"


function Table<T extends TDataWithId>(props: ITableProps<T>) {
  const columnOrderRef = useRef<TColumnOrderState<T>>([])

  const $TableHeaderRow = useMemo(() => {
    columnOrderRef.current.length = 0 //clear column order array

    const $thList = props.columns.map(column => {
      columnOrderRef.current.push(column.dataKey)
      return (
        <th key={String(column.dataKey)}>
          {column.header}
        </th>
      )
    })

    return (
      <tr>{$thList}</tr>
    )
  }, [props.columns])

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