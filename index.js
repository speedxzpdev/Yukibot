//=========CRÉDITOS=============\\
/*
Base feita por (BELPHEGOR & ARCANJA)

Alteraçoes no codigo (Speed)

CREDITOS:
ARCANJA, BELPHEGOR, DARK STARS & PEDROZZ MODS
*/

//===========BAILEYS==========\\
const { 
default: makeWASocket, downloadContentFromMessage,emitGroupParticipantsUpdate,emitGroupUpdate,makeInMemoryStore,prepareWAMessageMedia, MediaType,WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions,useMultiFileAuthState, BufferJSON,WAMessageProto,MessageOptions, PHONENUMBER_MCC,	 WAFlag,WANode,	 WAMetric,	 ChatModification,MessageTypeProto,WALocationMessage, ReconnectMode,WAContextInfo,proto,	 WAGroupMetadata,ProxyAgent,	 waChatKey,MimetypeMap,MediaPathMap,WAContactMessage,WAContactsArrayMessage,WAGroupInviteMessage,WATextMessage,WAMessageContent,WAMessage,BaileysError,WA_MESSAGE_STATUS_TYPE,MediaConnInfo, generateWAMessageContent, URL_REGEX,Contact, WAUrlInfo,WA_DEFAULT_EPHEMERAL,WAMediaUpload,mentionedJid,processTime,	 Browser, makeCacheableSignalKeyStore ,MessageType,Presence,WA_MESSAGE_STUB_TYPES,Mimetype,relayWAMessage,	 Browsers,GroupSettingChange,delay,DisconnectReason,WASocket,getStream,WAProto,isBaileys,AnyMessageContent,generateWAMessageFromContent, fetchLatestBaileysVersion,processMessage,processingMutex
} = require('@whiskeysockets/baileys');
//=========MODULOS===========\\
let pino = require('pino')
const fs = require('fs')
const axios = require('axios');
const chalk = require('chalk')
const Pino = require('pino')
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const fetch = require("node-fetch");
const os = require('os')
const tiktokdl = require('./comandos/ttk')
const reelsdl = require('./comandos/i_reels')
//importaçoes das configs!
const { prefixo_bot } = require('./config');
const { nome_bot } = require('./config');
const { donos } = require('./config')
const { Bot_icon } = require('./config')
const { bot_number } = require('./config')
//fig
const stickerCommand = require('./comandos/sticker')
const cmd_zueira = require('./comandos/zoeira')
const { amiguss } = require('./config')

const toimg = require('./comandos/toimg')

const exit = require('./comandos/exit')

//importaçoes de menus
const { menup } = require('./comandos/menup')

//arquivos em json ou db pra fazer ranks e coisas basicas
const respostas_prontas = JSON.parse(fs.readFileSync('./database/respostas_prontas.json', 'utf8'));

const editores = JSON.parse(fs.readFileSync('./database/links.json', 'utf8'))

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}


let phoneNumber = "557792142954"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
//============CONFIG==========\\
const prefix = prefixo_bot; //Prefixo do bot.
const verMsg = true; //True = ativo, False = desativado.
//Recomendo que não altere nada aqui pois sao variaveis das configuracoes se quiser mudar algo mude no arquivo config.js
const owners = donos

const botName = nome_bot

const ownerName = "speed"


//funcoes os que exibem config sobre seu pc/celular 

//sua mem total em bytes
const mem_byte = os.totalmem();
//sua mem total em gb
const mem_gb = (os.totalmem() / (1024 ** 3)).toFixed(2)

//pega o nome do seu os 
const os_name = os.type
//pega o nome da plataforma
const plat_name = os.platform
//tempo de execuçao do BOTECO
const tp_sem_formatar = Math.floor(process.uptime());
const hr_process = Math.floor(tp_sem_formatar / 3600)
const min_process = Math.floor((tp_sem_formatar %3600) / 60);
const seg_process = tp_sem_formatar % 60

//=======INICIO DO BOTECO=======\\
async function ligarbot() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'debug', stream: 'store' }) })

const { state, saveCreds } = await useMultiFileAuthState('./sessao')
const { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()
const client = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: !pairingCode,
mobile: useMobile, 
browser: ['Chrome (Linux)', '', ''],
 auth: {
 creds: state.creds,
 keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
browser: ['Chrome (Linux)', '', ''],
markOnlineOnConnect: true,
generateHighQualityLinkPreview: true,
getMessage: async (key) => {
 let jid = jidNormalizedUser(key.remoteJid)
 let msg = await store.loadMessage(jid, key.id)

 return msg?.message || ""
},
msgRetryCounterCache,
defaultQueryTimeoutMs: undefined,
 })
 
store.bind(client.ev)

//======CONEXÃO POR CODE=========\\
 if (pairingCode && !client.authState.creds.registered) {
if (useMobile) throw new Error('Não é possível usar o código de pareamento com a API móvel')

let phoneNumber
if (!!phoneNumber) {
 phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

 if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Comece com o código do país do seu número do WhatsApp, exemplo : +557792142954")))
process.exit(0)
 }
} else {
 phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Digite seu número do WhatsApp \nPor exemplo: +557792142954: `)))
 phoneNumber = phoneNumber.replace(/[^0-9]/g, '')


 if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Comece com o código do país do seu número do WhatsApp, exemplo : +557792142954")))

phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Digite seu número do WhatsApp \nPor exemplo: +557792142954 : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()
 }
}

setTimeout(async () => {
 let code = await client.requestPairingCode(phoneNumber)
 code = code?.match(/.{1,4}/g)?.join("-") || code
 console.log(chalk.black(chalk.bgGreen(`Seu código de emparelhamento : `)), chalk.black(chalk.white(code)))
}, 3000)
 }
//=======CLIENTES=======\\
var astaroth = client;
var laura = client;
var suc = client;
//*==================*\\
client.ev.on('chats.set', () => { console.log('setando conversas...'); })
client.ev.on('contacts.set', () => { console.log('setando contatos...'); })
client.ev.on('creds.update', saveCreds)

//========ATT DE MENSAGENS=========\\
client.ev.on('messages.upsert', async ({ messages }) => {
try {
const info = messages[0]
const msg = info;
if (!info.message) return 

const key = {
remoteJid: info.key.remoteJid,
id: info.key.id, 
participant: info.key.participant 
}
//PARA VIZUALIZAR AS MENSAGENS ENVIADAS AO BOT
if(verMsg) {
await client.readMessages([info.key]);
} else {
if(info.key.remoteJid == "status@broadcast") return;
}
const altpdf = Object.keys(info.message)
const type = altpdf[0] == 'senderKeyDistributionMessage' ? altpdf[1] == 'messageContextInfo' ? altpdf[2] : altpdf[1] : altpdf[0]

const from = info.key.remoteJid

var body = (type === 'conversation') ?
info.message.conversation : (type == 'imageMessage') ?
info.message.imageMessage.caption : (type == 'videoMessage') ?
info.message.videoMessage.caption : (type == 'extendedTextMessage') ?
info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ?
info.message.buttonsResponseMessage.selectedButtonId : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) && info.message.listResponseMessage.singleSelectReply.selectedRowId) ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ?
info.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (info.message.buttonsResponseMessage?.selectedButtonId || info.message.listResponseMessage?.singleSelectReply.selectedRowId || info.text) : ''




const isGroup = from.endsWith('@g.us');
const isCmd = body.startsWith(prefix)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const sender = info.key.participant || from;
const pushname = info.pushName ? info.pushName : ""


var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
//pega tudo que for escrito incluindo prefixo e comando!
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()
//mesma coisa porem aqui ele corta tudo que for escrito dps do prefixo
const texto_sem_cmd = texto_exato.trim().slice(body.indexOf(" ") + 1)
//SIMULA ESCRITA
async function escrever (texto) {
await client.sendPresenceUpdate('composing', from) 
await esperar(2000) 
client.sendMessage(from, { text: texto }, {quoted: info})
}
//ENVIA UMA MENSAGEM 
const enviar = (texto) => {
client.sendMessage(from, { text: texto }, {quoted: info})
}

//ENVIA UMA IMAGEM SIMPLES 
const enviarImg = async (link) => {
await client.sendMessage(from, {image: {url: link}}, {quoted: info})
}
//ENVIA UMA IMAGEM COM TEXTO 
const enviarImg2 = async (link, texto) => {
await client.sendMessage(from, {image: {url: link}, caption: texto}, {quoted: info})
}
//ENVIA UM GIF SIMPLES 
const enviarGif = async (link, caption = '', mentions = []) => {
  await client.sendMessage(from, {
    video: { url: link },
    caption: caption,
    gifPlayback: true,
    mentions: mentions
  }, { quoted: info });
};
//ENVIA UM VÍDEO SIMPLES 
const enviarVd = async (link) => {
await client.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}
//ENVIA UM VIDEO COM TEXTO
const enviarVd2 = async (link, texto) => {
await client.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}
//ENVIA UM ÁUDIO
const enviarAd = async (link) => {
await client.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})
}

const enviarAd2 = async (link) => {
await client.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg", ptt: true}, {quoted: info})
}
//CAUSA UM DELAY ENTRE FUNÇÃO 
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}
//REAGE A UMA MENSAGEM
const reagir = (reassao) => {
client.sendMessage(from, {react: {text: reassao, key: info.key}})}

//Menciona quem usou o comando
const autor = `@${sender.split("@")[0]}`;

//menciona todos!
const marcar_todos = isGroup
  ? (await client.groupMetadata(from)).participants.map(p => p.id)
  : []

//verifica se o bot é adm
const isBotAdmin = info.groupMetadata?.participants?.some(p => p.id === client.user.id && p.admin);

// Verifica se a pessoa é admin do grupo
const is_Group2 = info.key.remoteJid.endsWith('@g.us')


//para mandar figurinhas
const sendSticker = async (sock, jid, url) => {
  const gifPath = './temp/attp.gif'
  const webpPath = './temp/attp.webp'

  const { data } = await axios.get(url, { responseType: 'arraybuffer' })
  fs.writeFileSync(gifPath, data)

  await new Promise((r, rej) => {
    exec(`ffmpeg -i ${gifPath} -vcodec libwebp -filter:v fps=15 -lossless 0 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpPath}`, (e) => e ? rej(e) : r())
  })

  const webpBuffer = fs.readFileSync(webpPath)
  await sock.sendMessage(jid, { sticker: webpBuffer, animated: true })
}


//parte ensecial caso queira comandos apenas para admins restrito a donos
const groupAdmins = is_Group2 ? (await client.groupMetadata(from)).participants
  .filter(p => p.admin)
  .map(p => p.id) : []

const senderNormalized = sender.split('@')[0]; // pega só o número

//No geral isso é uma permissao que vale tanto para owner tanto quanto adm
const permAdmin = groupAdmins.includes(sender) || owners.includes(sender)

//Para reaprobeitamento em comandos com alvo
const isOwner = (jid) => owners.includes(jid)

//Pega as mencoes de uma mensagem
const mention = info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  || info.message?.extendedTextMessage?.contextInfo?.participant

//Escolhe uma string aleatoria de uma array igual no python
const choice_string = (lista) => lista[Math.floor(Math.random() * lista.length)];
  


  
  
const isGroup2 = from.endsWith("@g.us");

const isSenderOwner = donos.includes(sender);

//Bloqueio contra cmd no pv
//caso queira desativar isso coloque um // em todas as linhas dessa condicional
if (isCmd && !isGroup2 && !isSenderOwner && !amiguss.includes(sender)) {
  await enviarImg2("https://files.catbox.moe/oulem4.jpg", `Nossa... Infelizmente Não pego comando no privado. Caso queira alugar a bot por um preço bom fale com o dono do bot`)

await enviar("Se quiser continuar usando no pv Pode falar com meu dono.")
  return;
}
//detecta o link de um video do tiktok
if (body.startsWith("https://vm.tiktok.com")) {
await enviar("Hum... Acabei de Verificar esse link! Já estou baixando....")
await tiktokdl(fetchJson, texto_sem_cmd, enviarAd, enviar, client, from, reagir, info)
  return
}
//detecta insta
if (body.startsWith("https://www.instagram.com/reel")) {
  await enviar("Acabei de detectar esse reels! Só um momentinho...")
  reelsdl(client, info, enviar, enviarVd2, reagir, fetchJson, texto_sem_cmd)
return
}
  
//alguns eventos basicos!





switch(comando) {
//========CASES============\\
//comando que dá informaçoes sobre o dispositivo e tempo de resposta tá meio bugado mais irei resolver
case 'ping':
const inicio = Date.now();



const fim = Date.now();

await reagir("⚡")

const ping = fim - inicio

const info_ping = `*Informações Sobre onde Sou executada💜*

*👾Sistema operacional*:${os_name}
*📲Plataforma*:${plat_name}
*⚙️Memoria ram*:${mem_gb}GB
*💤Tempo de att*:${hr_process}hr${min_process}min${seg_process}seg
*⚡tempo de resposta*:${ping}ms`

enviarImg2("https://files.catbox.moe/hsqocn.jpg", info_ping)

break

//Aqui é um comando que fiz pra zoar um amigo basicamente ele repete 1000 vezes uma string kkkk
case 'barry':

await reagir("🫦")

let soma = 1000

let barry = "Boa tarde barry".repeat(soma)

await enviarImg2("https://files.catbox.moe/agiek0.jpg", barry)

await enviarAd("https://files.catbox.moe/c18nib.mp3")

break



//fiz esse comando só pra aprender a mexer com random kkkkkkk
case 'sorte':

const porcetagem = Math.floor(Math.random() * 100) + 1

await enviar(`Sua Sorte é de ${porcetagem}%`)

break



//comandos comuns



//converte fig em img fiz em um arquivo separado pois tava muito grande e baguncado
case 'toimg':
toimg(client, info, reagir)

break

//Aqui eu deixo ums link de ums editor gratis kkkk
case 'link':
case 'editor':
case 'links':
  try{
  await escrever(respostas_prontas.espera_basica)
  
  const lin_t = `*Aqui está alguns links!*
  
  *Amz*:${editores.amz}
  
  *NodeVideo*:${editores.nodevideo}
  
  *capcut*:${editores.capcut}
  
  *AE 2025*:${editores.AE2025}
  
  *AE 2020*:${editores.AE2020}`
  
  await enviar(lin_t)
  
  }
catch(e_l) {console.error("Ocorreu um erro ao pega os links", e_l)
  await enviar(respostas_prontas.erro_generico)
}
break

//mesma coisa do toimg porem converte imagem em fig tbm ta num arquivo diferente
case 's':
case 'sticker':
  
  
  await stickerCommand(client, info, reagir)

  
break
 
 
 
//Não acho necesario mudar nada aqui caso queira personalizar o menu tem um arquivo chamado menu.js em comandos
case "menu":
case "menuprincipal":
await enviar("Só um momento, estou buscando o menu principal!")

await enviarImg2(Bot_icon, menup)

break

//Aqui é um ban basico protege tanto o bot quanto donos
case 'ban':
  
  const sender = info.key.participant || info.key.remoteJid

  if (!mention) {
    await client.sendMessage(info.key.remoteJid, {
      text: 'Mencione alguém para banir.'
    }, { quoted: info })
    break
  }

  // Verifica se o autor da mensagem está na lista permAdmin
  if (!groupAdmins.includes(sender) && !owners.includes(sender)) {
  return client.sendMessage(info.key.remoteJid, {
    text: 'Eu não te conheco como admin, perdão mais você não manda em mim'
  }, { quoted: info })
}

  // Protege o próprio bot
  if (mention === bot_number) {
    await client.sendMessage(info.key.remoteJid, {
      text: 'Olha o respeito comigo rapaz, Eu também posso te banir sabia?'
    }, { quoted: info })
    break
  }
  
if (isOwner(mention)) {
  await client.sendMessage(info.key.remoteJid, {
    text: 'Perdão, mas não deixarei banir meu mestre! Ele é importante pra mim.'
  }, { quoted: info })
  await enviarAd("https://files.catbox.moe/j3pdgw.opus")
  

  
  break
}

  try {
    await client.groupParticipantsUpdate(info.key.remoteJid, [mention], 'remove')
    await client.sendMessage(info.key.remoteJid, {
      text: `O @${mention.split('@')[0]}. Foi Expulso por fazer besteiras!!`,
      mentions: [mention]
    }, { quoted: info })
  } catch (err) {
    await client.sendMessage(info.key.remoteJid, {
      text: 'erro ao tentar banir. Talvez eu não seja admin.'
    }, { quoted: info })
  }
  break




//comandos de api
//Aqui eu fiz num comando diferente chamado tiktok pra funcionar deve mudar a api ou colocar sua chave key da dark stars no arquivo tiktok
case 'ttk':
case 'tiktok':
if (!texto_sem_cmd) {
  await enviar("Eu preciso do link para baixar!")
break
  }

await enviar(respostas_prontas.espera_basica)

tiktokdl(fetchJson, texto_sem_cmd, enviarAd, enviar, client, from, reagir, info)
break

//aqui ele toca uma musica mude a api ou a key!!!
case 'play':
case 'tocar':
if (!texto_sem_cmd) {
  enviar(`Nossa... fiquei curiosa pra saber que Musica quer ouvir, Use ${prefix}play Nome da musga meu fio!`)
}
try {
await reagir("👀")
await enviar(respostas_prontas.espera_basica)
const pesquisa = encodeURIComponent(texto_sem_cmd);

const api_music = await fetchJson(`https://darkstars-api.dscp.shop/api/download/youtube-audiov4?Nome_Ou_Url=${pesquisa}&apikey=dark_key:3DSJ6YX7`)

const capa = `❒*Categoria Youtube/Spotify*
🎶⃟ *título*:${api_music.Resultado.Nome}
😼⃟ *Autor*:${api_music.Resultado.Dono.Nome}
❤️⃟ *Descrição*:${api_music.Resultado.Descricao}
👀⃟ *Views*:${api_music.Resultado.Visualizacao} 
💬⃟ *Enviado*:${api_music.Resultado.Enviado}
📎⃟ *Link*:${api_music.Resultado.LinkYoutube}`
await reagir("😼")
await enviar("Prontin, acabei de baixar!")

await enviarImg2(api_music.Resultado.ThumbnailYoutube, capa);
await enviar("Agora só um momentinho pra mim baixar o áudio!")
await enviarAd(api_music.Resultado.LinkAudio) }
catch(erro_music) {console.error("Ocorreu um erro no comando play:", erro_music)
await reagir("💔")
await enviar("Ocorreu um erro na api, Tente novamente depois.") }

break


//busca por animes mude a api ou api key!!!
case 'anime':
try {
const search_anime = encodeURIComponent(texto_sem_cmd)
if (!search_anime) {return await enviar("Informe um nome de algum anime!")}


await reagir("🔥")
await enviar("Só um mometinho...")
const api_anime = await fetchJson(`https://darkstars-api.dscp.shop/api/anime/infoAnime?nome=${search_anime}&apikey=dark_key:3DSJ6YX7`)

const animetext = `*Informações sobre: ${texto_sem_cmd}*

❒ *Nome*:${api_anime.resultado.titulo}
❒ *Nome em japonês*:${api_anime.resultado.titulo_japones}
❒ *Genero*:${api_anime.resultado.generos}
❒ *Nota*:${api_anime.resultado.nota}
❒ *Quantidade de Ep*:${api_anime.resultado.episodios}
❒ *Sinopse*:${api_anime.resultado.sinopse}
❒ *trailer*:${api_anime.resultado.trailer}`

await enviarImg2(api_anime.resultado.imagem, animetext)
}

catch(an_e) {console.an_e("Ocorreu um erro aqui", an_e) 
await reagir("💔")
await enviar("Ocorreu um erro na requisição💔")
}

break
//pega respostas do chatgpt mude a api ou key!!!
case 'chatgpt':
case 'gpt':

try {
const p_gpt = encodeURIComponent(texto_sem_cmd)
if (!p_gpt) { return await enviar(`Preciso saber oque deseja pergunta, Exemplo: ${prefix}chatgpt oi?`)}


await reagir("👀")
await enviar("Só um momentinho!")
const api_gpt = await fetchJson(`https://darkstars-api.dscp.shop/api/gpt?texto=oi,${p_gpt}&apikey=dark_key:3DSJ6YX7`)

const R_gpt = `*Resposta Do chatgpt*:

${api_gpt.resultado}`

await reagir("😸")
await enviarImg2("https://files.catbox.moe/ig5y4d.jpg", R_gpt)
}

catch(gpt_err) {console.gpt_err("Ocorreu um erro aqui", gpt_err) 
await reagir("💔")
await enviar("Ocorreu um erro com a api💔")}

break
//aqui baixa videos do insta por favo mude a api ou key!!
case 'instagram':
case 'insta':
await enviar(respostas_prontas.espera_basica)
reelsdl(client, info, enviar, enviarVd2, reagir, fetchJson, texto_sem_cmd)
  
break



//COMANDOS ADIMINISTRATIVOS
//Remove a propria bot do grupo. Só donos conseguem usar!
case 'kill':
exit(info, from, reagir, enviar, donos, client)
break



//Comando normal de totag mais com alguns bugs e imperfeicoes
case 'totag':
if (!permAdmin) {
  await reagir("😔")
  await enviar("Quem diria qualquer estranho Poder me usar livremente sem ter adm😅")
  return
}
  
await reagir("🩷")
await client.sendMessage(from, {text: `ꦽꦼ̷❄️•ˑ˒ *𝐀𝐯𝐢𝐬𝐨 𝐝𝐨 𝐚𝐝𝐦:${autor}*\n\n${texto_sem_cmd}`, mentions:marcar_todos}, {quoted:info})

break
//Promover uma pessoa
case 'promover':
case 'seraadm':
if (!mention) {await enviar("Precisa marcar ou responder alguém!") 
break}

if (!permAdmin) {await enviar("Como pode alguém como você querer promover uma pessoa?") 
break}

try {
  await client.groupParticipantsUpdate(info.key.remoteJid, [mention], 'promote')
  await enviar("Sucesso! Acabei de promover.")
}

catch(prom_err) {console.error("Ocorreu um erro aqui", prom_err) 
await enviar("Ocorreu um erro ao promover o usuário, talvez eu não esteja de admin!")}

//rebaixa uma pessoa
break
case 'rebaixar':
case 'tiraradm':
if (!mention) {await enviar("Precisa marcar ou responder alguém!") 
break}

if (!permAdmin) {await enviar("Como pode alguém como você querer rebaixar uma pessoa?") 
break}

if (donos.includes(mention)) {
  await enviar("Que tolo. Como alguém como você acha que pode rebaixar meu Mestre?")
  break
}


try {
  await client.groupParticipantsUpdate(info.key.remoteJid, [mention], 'demote')
  await enviar("Sucesso! Acabei de rebaixar.")
}

catch(prom_err) {console.error("Ocorreu um erro aqui", prom_err) 
await enviar("Ocorreu um erro ao rebaixar o usuário, talvez eu não esteja de admin!")}

break






//======CASES ACIMA=========\\
//Caso um comando seja invalido chama essa condição
default:
//chama a outra switch case de comando zoeiros
const cmd_tratado = await cmd_zueira(client, info, comando, enviar, enviarImg2, enviarGif, enviarAd, choice_string, prefixo_bot, mention, autor, reagir) 

if (isCmd && !cmd_tratado) {reagir("😖")

await enviarImg2("https://files.catbox.moe/4bcbll.jpg", `｡˚༷🌸｡ *𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐈𝐧𝐞𝐱𝐢𝐬𝐭𝐞𝐧𝐭𝐞!*\n𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐮𝐬𝐚𝐝𝐨:꯴᩠ꦽꦼ💌↦${texto} \n𝐒𝐮𝐠𝐞𝐬𝐭ã𝐨 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:${prefix}menu`)

}
}
//=========IFS===========\\



//=========IF ACIMA========\\
} catch (erro) {
console.log(erro)
}})

//=======ATT CONEXÃO========\\
suc.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;
if (connection === 'open') {//CONEXÃO ABERTA
console.log("[ CONECTADO ] - Conexão estabelecida...")
console.log("[ LOG ] - Bot conectado com sucesso ✅")
} else if (connection === "connecting") {//TENTANDO CONECTAR
console.log(``)
console.log("[ CONEXÃO ] - Estabelecendo conexão com o whatsapp...")
} else if (connection === 'close') {//CONEXÃO FECHADA
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
if (shouldReconnect) {
console.log('[ LOG ] - Tentando reconectar...');
ligarbot();
} else {
console.log('Desconectado. Finalizando...');
}}
})
}
ligarbot()

//========ATT INDEX========\\
fs.watchFile(__filename, (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log('A index foi editada, irei reiniciar...');
process.exit()
}
})
//===========FIM=========\\
