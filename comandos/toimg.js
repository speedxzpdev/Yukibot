const fs = require('fs');
const { exec } = require('child_process');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async function toimg(client, info, reagir) {
  const msg = info.message;
  const jid = info.key.remoteJid;

  const quoted = msg?.extendedTextMessage?.contextInfo?.quotedMessage;
  const sticker = quoted?.stickerMessage;

  if (!sticker) {
    await client.sendMessage(jid, {
      text: 'Responda a uma figurinha para converter.'
    }, { quoted: info });
    return;
  }

  await reagir('💜');

  const mediaMsg = { message: quoted };
  const buffer = await downloadMediaMessage(mediaMsg, 'buffer', {}, { reuploadRequest: client.updateMediaMessage });

  const nomeBase = `./assets/temp/${Date.now()}`;
  const input = `${nomeBase}.webp`;
  const output = `${nomeBase}.png`;

  fs.writeFileSync(input, buffer);

  exec(`ffmpeg -i ${input} ${output}`, async (err) => {
    if (err) {
      console.error('Erro ao converter figurinha:', err);
      await client.sendMessage(jid, {
        text: 'Falha na conversão.'
      }, { quoted: info });
      return;
    }

    await reagir("✨️")

    await client.sendMessage(jid, {
      image: fs.readFileSync(output),
      caption: 'Figurinha convertida Com sucesso!'
    }, { quoted: info });

    fs.unlinkSync(input);
    fs.unlinkSync(output);
  });
};