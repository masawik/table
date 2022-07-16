import React from "react"
import { TSampleTableData } from "../Api/Api.types"
import { ESortDirections } from "../components/Table/Table.types"

const defaultValue = {
  itemsPerPage: 20,
  sortBy: null as null | keyof TSampleTableData,
  sortDirection: ESortDirections.ASC as ESortDirections
}

type TSampleTableContext = typeof defaultValue

export const SampleTableContext = React.createContext<TSampleTableContext>(defaultValue)

