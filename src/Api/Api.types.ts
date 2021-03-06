export type TSampleTableData = {
  id: number,
  date: number,
  name: string,
  count: number,
  distance: number
}

export type TSelectItemsParams = {
  'per_page': number
  'page': number
  'sort_key'?: string
  'sort_desc': boolean
}

export type TSelectDataResponse = {
  data: TSampleTableData[],
  totalPages: number
}