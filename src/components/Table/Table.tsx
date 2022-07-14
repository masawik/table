import React, { useMemo } from 'react'
import styles from './Table.module.css'
import { ITableProps, TColumnOrderState, TDataWithId } from "./Table.types"


function Table<T extends TDataWithId>(props: ITableProps<T>) {

  //todo возможно, стоит хранить как-то по другому
  const columnOrder = [] as TColumnOrderState<T>

  const $TableHeaderRow = useMemo(() => {
    columnOrder.length = 0 //clear column order array

    const $thList = props.columns.map(column => {
      columnOrder.push(column.dataKey)
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

      const $tdList = columnOrder.map(dataKey => (
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