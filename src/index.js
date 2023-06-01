const nativeModule = require('bindings')('mp4decrypt-buffer')

/**
 * Decrypts buffer with provided keys
 * @param {Buffer} buffer
 * @param {Record<string, string>} keyMap
 * @returns {Promise<Buffer>}
 */
exports.decrypt = (buffer, keyMap) => {
  return new Promise(resolve => {
    nativeModule.decrypt(buffer, keyMap, resolve)
  })
}
