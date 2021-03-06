import { TStringOrNumber } from "../../helpers/typeHelpers"

type TObjectWithId = { id: TStringOrNumber }
export type TDataWithId = Record<string, unknown> & TObjectWithId

export interface IColumn<T extends TDataWithId> {
  header: string | JSX.Element,
  dataKey: keyof T,
  sortable?: boolean
}

export interface ITableProps<T extends TDataWithId> {
  columns: IColumn<T>[],
  data: T[],
  onSort?: (sortingState: TSortingState<T>) => void,
  caption: string
}

export type TColumnOrderState<T extends TDataWithId> = Array<IColumn<T>['dataKey']>

export enum ESortDirections {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type TSortingState<T extends TDataWithId> = { dataKey: keyof T, direction: ESortDirections } | null


