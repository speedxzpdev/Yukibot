const fs = require('fs');
const path = require('path');

function criarExif(nome) {
  const json = {
    "sticker-pack-id": "com.yuki.bot",
    "sticker-pack-name": "Yukizinha💜",
    "sticker-pack-publisher": `✨Yuki fig (feito por ${nome})`,
    "emojis": ["🌙", "✨"]
  };

  const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf-8');

  const exifHeader = Buffer.alloc(32);
  exifHeader.write('II');          // Byte Order (Intel = II)
  exifHeader.writeUInt16LE(0x2A, 2);   // 0x002A
  exifHeader.writeUInt32LE(8, 4);      // Offset to IFD
  exifHeader.writeUInt16LE(1, 8);      // Number of directory entries
  exifHeader.writeUInt16LE(0x0141, 10); // Tag
  exifHeader.writeUInt16LE(7, 12);     // Type = UNDEFINED
  exifHeader.writeUInt32LE(1, 14);     // Count
  exifHeader.writeUInt32LE(jsonBuffer.length, 18); // Total length
  // 4 bytes padding
  exifHeader.writeUInt32LE(0, 22);  

  const exifBuffer = Buffer.concat([exifHeader, jsonBuffer]);

  const exifPath = path.join(__dirname, '../../assets/temp/exif.exif');
  fs.writeFileSync(exifPath, exifBuffer);

  return exifPath;
}

module.exports = {
  criarExif
};