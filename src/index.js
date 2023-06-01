const nativeModule = require('bindings')('mp4decrypt-buffer')

exports.decrypt = (buffer, keyMap) => {
  return new Promise(resolve => {
    nativeModule.decrypt(buffer, keyMap, resolve)
  })
}
