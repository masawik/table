export const convertObjectToQueryParamString =
  (data: Record<string, unknown>): string => {
    return Object.keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&')
  }