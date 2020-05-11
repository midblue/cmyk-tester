export const state = () => ({
  file: null,
  filename: 'file',
  colors: [
    [100, 0, 0, 0, 'CMYK Cyan'],
    [0, 100, 0, 0, 'CMYK Magenta'],
    [0, 0, 100, 0, 'CMYK Yellow'],
    [0, 0, 0, 100, 'CMYK Key'],
    [0, 0, 0, 0, 'White'],
    [0, 9, 100, 0, 'Yellow'],
    [73, 0, 81, 0, 'Green'],
    [68, 0, 79, 16, 'Flourescent Green'],
    [0, 72, 31, 0, 'Fluorescent Pink'],
    [0, 55, 53, 0, 'Fluorescent Orange'],
    [0, 60, 63, 0, 'Red'],
    [100, 65, 1, 17, 'Federal Blue'],
    [30, 0, 70, 0, 'Flourescent Yellow'],
    [6, 26, 97, 15, 'Flat Gold'],
    [25, 17, 15, 44, 'Light Gray'],
    [49, 0, 11, 0, 'Aqua'],
    [40, 51, 0, 0, 'Violet'],
    [93, 0, 36, 0, 'Light Teal'],
    [24, 94, 1, 21, 'Wine'],
  ],
  alphas: [1, 1, 1, 1],
})

export const mutations = {
  set(state, payload) {
    for (let p in payload) state[p] = payload[p]
  },
}

export const actions = {}
