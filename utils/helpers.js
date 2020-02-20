export const isObject = object => object && typeof object === 'object'

export const deepMerge = (...object) => object.reduce((acc, cur) => {
    Object.keys(cur).forEach(key => {
        acc[key] = Array.isArray(acc[key]) && Array.isArray(cur[key])
                ? [...acc[key], ...cur[key]]
                    .filter((value, idx, arr) => arr.indexOf(value) === idx)
                : isObject(acc[key]) && isObject(cur[key])
                    ? deepMerge(acc[key], cur[key])
                    : cur[key]
    })
    return acc
}, {})
