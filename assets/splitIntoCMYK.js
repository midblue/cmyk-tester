const jimp = require('jimp')

let memoedFile
let previousDestinationHex = []
let previousDestinationAlpha = []
let previousMaxWH

async function preload(file, maxWH = null) {
  // todo get this running in a service worker
  if (
    memoedFile &&
    file.substring(1000, 1400) === memoedFile.name &&
    maxWH === previousMaxWH
  ) {
    console.log('using preloaded file.')
    return await memoedFile.data
  }
  const data = await jimp
    .read(file)
    .then(image => (maxWH ? image.scaleToFit(maxWH, maxWH) : image))
    .catch(err => {
      console.log(err)
    })
  memoedFile = {
    name: file.substring(1000, 1400),
    data,
  }
  console.log('loaded and resized image')
  return data
}

async function split(file, destinationHex, destinationAlpha, maxWH) {
  console.log('target colors:', destinationHex)
  const willGenerateLayers = []
  for (let index in destinationHex) {
    willGenerateLayers.push(
      destinationHex[index] !== previousDestinationHex[index] ||
        destinationAlpha[index] !== previousDestinationAlpha[index] ||
        file.substring(1000, 1400) !== memoedFile.name ||
        maxWH !== previousMaxWH,
    )
  }
  console.log(
    'generating',
    willGenerateLayers.reduce((t, l) => (t += l ? 1 : 0), 0),
    'layers at',
    maxWH + 'px',
  )

  console.time('time to create image')
  const baseImage = await preload(file, maxWH)
  const baseBitmapData = baseImage.bitmap.data

  const imagePromises = willGenerateLayers.map(async (willGenerate, i) => {
    if (!willGenerate) return false
    baseImage.bitmap.data = [...baseBitmapData]
    const destinationRGB = hexToRGB(destinationHex[i])
    return baseImage
      .scan(0, 0, baseImage.bitmap.width, baseImage.bitmap.height, function(
        x,
        y,
        idx,
      ) {
        const r = this.bitmap.data[idx]
        const g = this.bitmap.data[idx + 1]
        const b = this.bitmap.data[idx + 2]
        const cmyk = rgb2cmyk(r, g, b)
        const outputLevel = parseInt(cmyk[i] * 255 * destinationAlpha[i]) // base alpha multiplied by manual modifier
        this.bitmap.data[idx] = destinationRGB[0]
        this.bitmap.data[idx + 1] = destinationRGB[1]
        this.bitmap.data[idx + 2] = destinationRGB[2]
        this.bitmap.data[idx + 3] = outputLevel
      })
      .getBase64Async('image/png')
  })

  baseImage.bitmap.data = [...baseBitmapData] // reset in case we use it again

  const newImages = await Promise.all(imagePromises)
  console.timeEnd('time to create image')

  previousDestinationHex = destinationHex
  previousDestinationAlpha = destinationAlpha
  previousMaxWH = maxWH

  return newImages
}

function rgb2cmyk(r, g, b) {
  var computedC = 0
  var computedM = 0
  var computedY = 0
  var computedK = 0

  // BLACK
  if (r == 0 && g == 0 && b == 0) {
    computedK = 1
    return [0, 0, 0, 1]
  }

  computedC = 1 - r / 255
  computedM = 1 - g / 255
  computedY = 1 - b / 255

  var minCMY = Math.min(computedC, Math.min(computedM, computedY))
  computedC = (computedC - minCMY) / (1 - minCMY)
  computedM = (computedM - minCMY) / (1 - minCMY)
  computedY = (computedY - minCMY) / (1 - minCMY)
  computedK = minCMY

  return [computedC, computedM, computedY, computedK]
}

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null
}

module.exports = { split, preload }
