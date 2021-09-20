# mp4decrypt-buffer

Take CENC media and decrypt it using [Bento4](https://github.com/axiomatic-systems/Bento4)'s `mp4decrypt` and Node `Buffer`s. Perfect for small files like DASH segments.

## Supported systems
- Windows 32-bit and 64-bit
- Linux 64-bit

## Example
```javascript
const mp4decrypt = require('mp4decrypt-buffer')

const keys = {
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
}

const encrypted = fs.readFileSync('enc.m4s')
mp4decrypt.decrypt(encrypted, keys).then(decrypted => {
  fs.writeFileSync('dec.mp4', decrypted)
})
```

## Third-party software
This repo contains prebuilts of [Bento4](https://github.com/axiomatic-systems/Bento4) 1.6.0.639 library.
