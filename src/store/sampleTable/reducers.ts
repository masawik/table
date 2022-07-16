import { TSampleTableData } from "../../Api/Api.types"

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

export enum EDataActionTypes {
  LOAD = 'LOAD_DATA'
}

type TDataPayload = {
  [EDataActionTypes.LOAD]: TSampleTableData[]
}

export type TDataActions = ActionMap<TDataPayload>[keyof ActionMap<TDataPayload>]


export type TActions = TDataActions

export const dataReducer = (state: TSampleTableData[], action: TActions) => {
  switch (action.type) {
    case "LOAD_DATA":
      return action.payload
    default:
      return state
  }
}

