const nativeModule = require('bindings')('mp4decrypt')

exports.decrypt = (buffer, keyMap) => {
  return new Promise(resolve => {
    nativeModule.decrypt(buffer, keyMap, resolve)
  })
}
