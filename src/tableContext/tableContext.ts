import React from "react"
import { IColumn, TDataWithId } from "../components/Table/Table.types"

interface ITableContext<T extends TDataWithId> {
  data: T[],
  columns: IColumn<T>[]
}


