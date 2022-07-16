import axios, { AxiosResponse } from "axios"
import { TSelectDataResponse, TSelectItemsParams } from "./Api.types"
import { convertObjectToQueryParamString } from "./helpers"


class Api {
  private API_URL = 'http://localhost:3010/api'

  async selectData(params: TSelectItemsParams): Promise<TSelectDataResponse> {
    let response: AxiosResponse<TSelectDataResponse>

    const paramsToSend = {
      ...params,
      'sort_desc': Number(params.sort_desc)
    }

    const reqUrl = `${this.API_URL}/table-items?${convertObjectToQueryParamString(paramsToSend)}`

    try {
      response = await axios.get<TSelectDataResponse>(reqUrl)
    } catch (err) {
      throw new Error(`error while fetching data. ${err}`)
    }

    return response.data
  }
}

export default new Api()