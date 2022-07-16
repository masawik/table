import { TSampleTableData } from "../../Api/Api.types"

export enum EDataActionTypes {
  LOAD = 'DATA_LOAD'
}

type TDataLoadAction = { type: EDataActionTypes.LOAD, payload: TSampleTableData[] }

export const loadData = (data: TSampleTableData[]): TDataLoadAction => ({ type: EDataActionTypes.LOAD, payload: data })

export type TActions = TDataLoadAction