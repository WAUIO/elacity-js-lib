export const toLowerCase = (val: string | undefined | null) => {
  if (val) return val.toLowerCase()
  else return val
}