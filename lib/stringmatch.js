// @flow
export const stringContains = (string: string, filter: string) => {
  return (
    string
      .toLowerCase()
      .trim()
      .indexOf(filter.toLowerCase().trim()) !== -1
  )
}
