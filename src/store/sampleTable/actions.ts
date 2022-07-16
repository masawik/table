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


// ----- pagination actions -----
export enum EPaginationActionTypes {
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'
}

type TPaginationSetCurrentPage = { type: EPaginationActionTypes.SET_CURRENT_PAGE, payload: number }
export const setCurrentPage = (page: number): TPaginationSetCurrentPage =>
  ({ type: EPaginationActionTypes.SET_CURRENT_PAGE, payload: page })

type TPaginationSetTotalPages = { type: EPaginationActionTypes.SET_TOTAL_PAGES, payload: number }
export const setTotalPages = (pages: number): TPaginationSetTotalPages =>
  ({ type: EPaginationActionTypes.SET_TOTAL_PAGES, payload: pages })

export type TPaginationActions = TPaginationSetCurrentPage | TPaginationSetTotalPages

// ---- all actions -----
export type TActions = TDataActions | TSettingsActions | TPaginationActions