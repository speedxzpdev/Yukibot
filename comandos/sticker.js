const fs = require('fs');
const { exec } = require('child_process');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async function stickerCommand(client, info, reagir) {
  const msg = info.message;
  const jid = info.key.remoteJid;

  await reagir("❄️");

  const directMedia = msg.imageMessage || msg.videoMessage || msg.stickerMessage;
  const quoted = msg?.extendedTextMessage?.contextInfo?.quotedMessage;
  const quotedMedia = quoted?.imageMessage || quoted?.videoMessage || quoted?.stickerMessage;

  if (!directMedia && !quotedMedia) {
    await client.sendMessage(jid, {
      text: 'Por favor me envie uma foto ou responda uma!'
    }, { quoted: info });
    return;
  }

  await client.sendMessage(jid, {
    text: 'Só um momentinho!'
  }, { quoted: info });

  const mediaMsg = quotedMedia
    ? { message: quoted }
    : { message: { ...msg } };

  let buffer;
  try {
    buffer = await downloadMediaMessage(
      mediaMsg,
      'buffer',
      {},
      { reuploadRequest: client.updateMediaMessage }
    );
  } catch (err) {
    console.error('❌ Erro ao baixar a mídia:', err);
    await client.sendMessage(jid, {
      text: 'erro ao baixar a mídia. Verifique se é uma imagem ou vídeo curto.'
    }, { quoted: info });
    return;
  }

  const fileName = `./assets/temp/${Date.now()}`;
  const inputPath = `${fileName}.jpg`;
  const outputPath = `${fileName}.webp`;

  fs.writeFileSync(inputPath, buffer);

  // Detecta se é vídeo
  const isVideo = !!(quoted?.videoMessage || msg.videoMessage);
  const filter = isVideo
  ? `"scale=512:512,fps=10"`
  : `"scale=512:512"`;

const tempo = isVideo ? '-t 10' : '';

const comando = `ffmpeg -i ${inputPath} -vf ${filter} -vcodec libwebp -lossless 0 -q:v 70 -loop 0 -an -vsync 0 ${tempo} ${outputPath}`;

  exec(comando, async (err) => {
    if (err) {
      console.error('❌ FFmpeg erro:', err);
      await client.sendMessage(jid, {
        text: 'Falha ao converter. Envie uma imagem ou vídeo curto de até 10 segundos.'
      }, { quoted: info });
      return;
    }

    await reagir("✨️");

    const stickerBuffer = fs.readFileSync(outputPath);
    await client.sendMessage(jid, {
      sticker: stickerBuffer
    }, { quoted: info });

    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  });
};