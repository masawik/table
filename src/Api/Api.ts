import axios, { AxiosResponse } from "axios"
import { TSampleTableData, TSelectItemsParams } from "./Api.types"
import { convertObjectToQueryParamString } from "./helpers"


class Api {
  private API_URL = 'http://localhost:3010/api'

  async selectData(params: TSelectItemsParams): Promise<TSampleTableData[]> {
    let response: AxiosResponse<TSampleTableData[]>

    const paramsToSend = {
      ...params,
      'sort_desc': Number(params.sort_desc)
    }

    const reqUrl = `${this.API_URL}/table-items?${convertObjectToQueryParamString(paramsToSend)}`

    try {
      response = await axios.get<TSampleTableData[]>(reqUrl)
    } catch (err) {
      throw new Error(`error while fetching data. ${err}`)
    }

    return response.data
  }
}

export default new Api()