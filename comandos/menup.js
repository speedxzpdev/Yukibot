const { prefixo_bot } = require("../config")
const { nome_bot } = require("../config")
const { Dono_p_name } = require("../config")
const { Sub_donos_name } = require("../config")
const { Bot_icon } = require("../config")

const agora = new Date();


const menup = `🌷⃟  *𝐍𝐨𝐦𝐞*:${nome_bot}
👾⃟ *𝐏𝐫𝐞𝐟𝐢𝐱𝐨*:${prefixo_bot}
💜⃟ *𝐃𝐚𝐭𝐚*:${agora.toLocaleDateString('pt-BR')}
🩷⃟ *𝐇𝐨𝐫𝐚*:${agora.toLocaleTimeString('pt-BR')}
🕷⃟  *𝐃𝐨𝐧𝐨*:${Dono_p_name}
🥀⃟ *𝐒𝐮𝐛𝐃𝐨𝐧𝐨𝐬*:
${Sub_donos_name.join('\n')}

*𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐩𝐫𝐚 𝐚𝐝𝐦*

${prefixo_bot}ban @lobinho

${prefixo_bot}promover @ispidiii

${prefixo_bot}rebaixar @miguel

${prefixo_bot}totag o ispidi é gostosão

*𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝*
${prefixo_bot}play \`Nome da musica\`

${prefixo_bot}tiktok \`SEU LINK\`

${prefixo_bot}instagram \`SEU LINK\`

*𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐢𝐚*

${prefixo_bot}chatgpt é verdade que o salyx é femboy?

*𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐠𝐞𝐫𝐚𝐢𝐬*

${prefixo_bot}ping
${prefixo_bot}sticker
${prefixo_bot}toimg
${prefixo_bot}barry
`

module.exports = {
  menup
}

