import axios, { AxiosResponse } from "axios"
import { ISampleTableData, TSelectItemsParams } from "./Api.types"
import { convertObjectToQueryParamString } from "./helpers"


class Api {
  private API_URL = 'http://localhost:3010/api'

  async selectData(params: TSelectItemsParams): Promise<ISampleTableData[]> {
    let response: AxiosResponse<ISampleTableData[]>
    const reqUrl = `${this.API_URL}/table-items?${convertObjectToQueryParamString(params)}`

    try {
      response = await axios.get<ISampleTableData[]>(reqUrl)
    } catch (err) {
      throw new Error(`error while fetching data. ${err}`)
    }

    return response.data
  }
}

export default new Api()