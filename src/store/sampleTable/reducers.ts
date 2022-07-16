import { TSampleTableData } from "../../Api/Api.types"
import { EDataActionTypes, TActions } from "./actions"


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

export const initialState = {
  data: dataInitialState
}
export type TSampleTableState = typeof initialState

export const rootReducer = ({ data }: TSampleTableState, action: TActions) => ({
  data: dataReducer(data, action)
})