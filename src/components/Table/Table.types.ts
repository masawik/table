type TStringOrNumber = string | number
type TData = { [key: TStringOrNumber]: TStringOrNumber }
type TObjectWithId = { id: TStringOrNumber }

export type TDataWithId = TData & TObjectWithId

export interface IColumn<T extends TDataWithId> {
  header: string | JSX.Element,
  dataKey: keyof T,
  sortable: boolean,
  // filterOptions:
}

export interface ITableProps<T extends TDataWithId> {
  columns: IColumn<T>[],
  data: T[]
}

export type TColumnOrderState<T extends TDataWithId> = Array<IColumn<T>['dataKey']>

export enum ESortDirections {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type TSortingState<T extends TDataWithId> = { dataKey: keyof T, direction: ESortDirections }
