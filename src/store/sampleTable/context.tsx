import React, { useReducer } from "react"
import { TSampleTableData } from "../../Api/Api.types"
import { dataReducer, TActions } from "./reducers"

const initialState = {
  data: [] as TSampleTableData[],
  // itemsPerPage: 20,
  // sortBy: null as null | keyof TSampleTableData,
  // sortDirection: ESortDirections.ASC as ESortDirections
}

type TSampleTableContextState = typeof initialState

const SampleTableContext = React.createContext<{
  state: TSampleTableContextState;
  dispatch: React.Dispatch<TActions>;
}>({
  state: initialState,
  dispatch: () => null
})

const rootReducer = ({ data }: TSampleTableContextState, action: TActions) => ({
  data: dataReducer(data, action)
})

const SampleTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <SampleTableContext.Provider value={{ state, dispatch }}>
      {children}
    </SampleTableContext.Provider>
  )
}

export { SampleTableContext, SampleTableProvider }