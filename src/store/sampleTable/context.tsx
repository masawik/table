import React, { useReducer } from "react"
import { TActions } from "./actions"
import { initialState, rootReducer, TSampleTableState } from "./reducers"


export const SampleTableContext = React.createContext<{
  state: TSampleTableState;
  dispatch: React.Dispatch<TActions>;
}>({
  state: initialState,
  dispatch: () => null
})

export const SampleTableProvider: React.FC<{ children: React.ReactNode }> =
  ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <SampleTableContext.Provider value={{ state, dispatch }}>
      {children}
    </SampleTableContext.Provider>
  )
}
