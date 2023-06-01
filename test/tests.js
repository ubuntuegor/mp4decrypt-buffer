// @ts-check

const mp4decrypt = require('..')
const fs = require('fs')
const path = require('path')
const MP4Box = require('mp4box')

/**
 * Single test
 * @typedef {Object} Test
 * @property {string} original
 * @property {string} encrypted
 * @property {Record<string, string>} keys
 */

/**
 * @type {[Test]}
 */
const tests = [
  {
    original: 'test1src.mp4',
    encrypted: 'test1enc.mp4',
    keys: {
      e85ab20a1e9fe880c3684876665956cb: 'f53a3d99a8d332c5c3e9f87ecddad294'
    }
  }
]

main()

async function main () {
  for (let i = 0; i < tests.length; i++) {
    try {
      await doTest(tests[i])
    } catch (e) {
      console.error(`Test ${i} failed`)
      throw e
    }
  }

  console.info('All tests passed!')
}

/**
 * @param {Test} t
 */
async function doTest (t) {
  const src = readFile(t.original)
  const encrypted = readFile(t.encrypted)
  const decrypted = await mp4decrypt.decrypt(encrypted, t.keys)

  const srcSamples = await getSamples(src)
  const decSamples = await getSamples(decrypted)

  if (!compareSamples(srcSamples, decSamples)) {
    throw new Error('Samples did not match')
  }
}

function readFile (filename) {
  return fs.readFileSync(path.join(__dirname, 'media', filename))
}

function compareSamples (s1, s2) {
  if (s1.length !== s2.length) return false

  for (let i = 0; i < s1.length; i++) {
    const a1 = s1[i].data
    const a2 = s2[i].data

    if (!compareArrays(a1, a2)) return false
  }

  return true
}

function compareArrays (a1, a2) {
  if (a1.length !== a2.length) return false

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) return false
  }

  return true
}

// should only get first 1000 samples
function getSamples (file) {
  return new Promise((resolve, reject) => {
    const mp4boxfile = MP4Box.createFile()

    const parseTimeout = setTimeout(() => {
      reject(new Error('Not a valid mp4 file'))
    }, 5000)

    mp4boxfile.onError = function (e) {
      reject(new Error('Failed to parse samples: ' + e))
    }

    mp4boxfile.onReady = function (info) {
      mp4boxfile.setExtractionOptions(info.tracks[0].id)
      mp4boxfile.start()
    }

    mp4boxfile.onSamples = function (id, user, samples) {
      clearTimeout(parseTimeout)
      resolve(samples)
    }

    const arrayBuffer = file.buffer
    arrayBuffer.fileStart = 0
    mp4boxfile.appendBuffer(arrayBuffer)
    mp4boxfile.flush()
  })
}
