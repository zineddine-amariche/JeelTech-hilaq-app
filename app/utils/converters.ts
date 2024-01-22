export const trasnformCamelCaseToSnakeCaseObject = o =>
  Object.keys(o).reduce((acc, k) => {
    const newKey = k.replace(/([A-Z])/g, m => "_" + m.toLowerCase())
    acc[newKey] = o[k]
    return acc
  }, {})

export const trasnformSnakeCaseToCamelCaseObject = o =>
  Object.keys(o).reduce((acc, k) => {
    const newKey = k.replace(/_([a-z])/g, (_, m) => m.toUpperCase())
    acc[newKey] = o[k]
    return acc
  }, {})
