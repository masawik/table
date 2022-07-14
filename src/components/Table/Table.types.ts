import { TStringOrNumber } from "../../helpers/typeHelpers"

type TData = { [key: TStringOrNumber]: TStringOrNumber }
type TObjectWithId = { id: TStringOrNumber }
export type TDataWithId = TData & TObjectWithId

export interface IColumn<T extends TDataWithId> {
  header: string | JSX.Element,
  dataKey: keyof T,
}

export interface ITableProps<T extends TDataWithId> {
  columns: IColumn<T>[],
  data: T[]
}

export type TColumnOrderState<T extends TDataWithId> = Array<IColumn<T>['dataKey']>





