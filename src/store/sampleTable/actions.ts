import { TSampleTableData } from "../../Api/Api.types"

// ----- data actions -----
export enum EDataActionTypes {
  LOAD = 'DATA_LOAD'
}

type TDataLoadAction = { type: EDataActionTypes.LOAD, payload: TSampleTableData[] }
export const loadData = (data: TSampleTableData[]): TDataLoadAction => ({ type: EDataActionTypes.LOAD, payload: data })

export type TDataActions = TDataLoadAction

// ----- settings actions -----
export enum ESettingsActionTypes {
  SET_SORT_KEY = 'SET_SORT_KEY',
  SET_SORT_DESC = 'SET_SORT_DESC'
}

type TSettingsSetSortKeyAction = { type: ESettingsActionTypes.SET_SORT_KEY, payload: keyof TSampleTableData }
export const setSortKey = (key: keyof TSampleTableData): TSettingsSetSortKeyAction =>
  ({ type: ESettingsActionTypes.SET_SORT_KEY, payload: key })

type TSettingsSetSortDesc = { type: ESettingsActionTypes.SET_SORT_DESC, payload: boolean }
export const setSortDesc = (sortDesc: boolean): TSettingsSetSortDesc =>
  ({ type: ESettingsActionTypes.SET_SORT_DESC, payload: sortDesc })

export type TSettingsActions = TSettingsSetSortKeyAction | TSettingsSetSortDesc

export type TActions = TDataActions | TSettingsActions