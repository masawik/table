import { TSampleTableData } from "../../Api/Api.types"
import { EDataActionTypes, EPaginationActionTypes, ESettingsActionTypes, TActions } from "./actions"

// ----- data -----
const dataInitialState = [] as TSampleTableData[]
type TDataState = typeof dataInitialState
export const dataReducer = (state: TDataState, action: TActions) => {
  switch (action.type) {
    case EDataActionTypes.LOAD:
      return action.payload
    default:
      return state
  }
}


// ----- settings -----
const settingsInitialState = {
  rowsPerPage: 5,
  sortKey: null as null | string,
  sortDesc: false as boolean
}
type TSettingsState = typeof settingsInitialState
export const settingsReducer = (state: TSettingsState, action: TActions) => {
  switch (action.type) {
    case ESettingsActionTypes.SET_SORT_DESC:
      return { ...state, sortDesc: action.payload }

    case ESettingsActionTypes.SET_SORT_KEY:
      return { ...state, sortKey: action.payload }

    default:
      return state
  }
}


// ----- pagination -----
const paginationInitialState = {
  currentPage: 0 as number,
  totalPages: 0 as number
}
type TPaginationState = typeof paginationInitialState
export const paginationReducer = (state: TPaginationState, action: TActions) => {
  switch (action.type) {
    case EPaginationActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    case EPaginationActionTypes.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }

    case ESettingsActionTypes.SET_SORT_DESC:
    case ESettingsActionTypes.SET_SORT_KEY:
      if (state.currentPage !== 0) return { ...state, currentPage: 0 }
      else return state
    default:
      return state
  }
}


// ----- root -----
export const initialState = {
  data: dataInitialState,
  settings: settingsInitialState,
  pagination: paginationInitialState
}
export type TSampleTableState = typeof initialState

export const rootReducer = ({ data, settings, pagination }: TSampleTableState, action: TActions) => ({
  data: dataReducer(data, action),
  settings: settingsReducer(settings, action),
  pagination: paginationReducer(pagination, action)
})