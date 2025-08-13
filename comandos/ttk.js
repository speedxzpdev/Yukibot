//TIRE ESSA LINHA E COLE SUA API KEY OU SUA API!!!
const { api_key } = require('../api')


module.exports = async function tiktokdl(fetchJson, texto_sem_cmd, enviarAd, enviar, client, from, reagir, info, texto_exato) {
  
try {
api = await fetchJson(`https://darkstars-api.dscp.shop/api/download/tiktokV2?url=${texto_exato}&apikey=${api_key}&username=sla`)
Tyexto = `*Yuki Donwload!*

*Título*: ${api.resultado.title}

*Gostos*:${api.resultado.like}

*Comentarios*: ${api.resultado.comentario}

*Visualização*: ${api.resultado.views}

*Link Vídeo*: ${api.resultado.link}

*Link Musica*: ${api.resultado.musica}

*Hora do post*: ${api.resultado.hora_de_criacao}

*Donwload*: ${api.resultado.sem_marcadagua} `
await reagir("😼")
await client.sendMessage(from, {video: {url: api.resultado.sem_marcadagua}, caption: Tyexto, mimetype: "video/mp4"}, {quoted: info})
await enviar("Sabia que oque melhora um video é o áudio? Então não poderia faltar🫠")
await enviarAd(api.resultado.musica)
} catch (erro) {
await reagir("💔")
await enviar("Ocorreu um erro na api")
console.error("Deu erro aqui: " + erro)
}
  
}


