import { IColumn, ITableProps, TDataWithId } from "../Table/Table.types"

export enum ESortDirections {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface ISortableColumn<T extends TDataWithId> extends IColumn<T> {
  sortable?: boolean
}

export interface ISortableTableProps<T extends TDataWithId> extends ITableProps<T> {
  columns: ISortableColumn<T>[]
}

export type TSortingState<T extends TDataWithId> = { dataKey: keyof T, direction: ESortDirections } | null
