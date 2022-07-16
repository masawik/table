import { TSampleTableData } from "../../Api/Api.types"
import { EDataActionTypes, ESettingsActionTypes, TActions } from "./actions"

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
  rowsPerPage: 20,
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


// ----- root -----
export const initialState = {
  data: dataInitialState,
  settings: settingsInitialState
}
export type TSampleTableState = typeof initialState

export const rootReducer = ({ data, settings }: TSampleTableState, action: TActions) => ({
  data: dataReducer(data, action),
  settings: settingsReducer(settings, action)
})