//switch case para comando de brincadeira Atençao!!! Use return true em qualquer if e tambem use como brake para não dar erro e nem criar um loop doido ai

module.exports = async function cmd_zueira(client, info, comando, enviar, enviarImg2, enviarAd, enviarGif, choice_string, prefixo_bot, mention, autor, reagir,) {
    
const { bot_number } = require('../config')



const jid = client.user.id

const from = info.key.remoteJid;

const sender = info.key.participant || info.key.remoteJid;

//const mention_n = mention.split("@")[0]

switch(comando) {
//Aquele clasico comando de beijo com proteçao pra bot
case 'beijar':
case 'beijo':
try {

if (!mention) {
  await enviar("I rapaiz acabou se emocionando tanto, que se esqueceu de escolher um alvo.") 
  return true
}

if (mention == bot_number) {
  await enviar("Eita... O cara é tão iludido que acha que rouba um beijo meu!")
  return true
}

f_beijo = ["I rapaiz que tenso!", "Dizem um dos dois só faltou engolir o outro quem será?", "Vish, daqui a pouco eles acabam em outra coisa...", "Um selinho bem sem graça. Botei tanta fé...", "Rapaz, Assim do nada? Que inveja em!"]

await reagir("🫦")
await client.sendMessage(from, {
    video: {url: "https://files.catbox.moe/3vi1vf.mp4"},
    caption: `O @${sender.split("@")[0]} Acabou de beijar @${mention.split('@')[0]}\n${choice_string(f_beijo)}`,
    gifPlayback: true,
    mentions: [sender, mention]
  }, { quoted: info })}

catch(e_bv) {
  await enviar("Ocorreu um erro nesse comando, perdão.")
  console.error("Ocorreu um erro no cmd bv", e_bv)
}

    
return true;





//Tapa bem safadinho protege contra a bot
case 'tapa':
  if (!mention) {
  await enviar("Humm... Marque alguém parar dá aquele tapa!")
return true
  
}

await reagir("😳")

const leg_tapa = ["Tão bem safadinhos hoje né...", "Que isso rapazes... Estão praticando atos libidinosos em minha presença!", "Pode isso? Marrapaz... Que brincadeiras deliciosas!"]

await client.sendMessage(from, {video: {url: "https://files.catbox.moe/rvxvsq.mp4"} , 
caption: `Nossa o @${sender.split("@")[0]} Deu aquele tapa Em @${mention.split("@")[0]}\n${choice_string(leg_tapa)}`, 
gifPlayback: true, 
mentions: [sender, mention]
  
}, { quoted: info })


return true;


//É... prefiro n documentar esse comando. Protege contra a bot
case 'molestar':
if (!mention) {
  await enviar("Eita... Rs, tá confuso? Marca o alvo aí!")
  return true
}

if (mention === bot_number) {
  await enviar("Ei, Olhe o respeito! Não prático esses tipos de coisas.")
  return true
}


await reagir("😰")

const leg_mol = [`Eita... Rs @${sender.split("@")[0]} tentou atacar porém... O @${mention.split("@")[0]} Tava no auge do tesão!`, `Ui! Até fiquei com pena... @${sender.split("@")[0]} Arregaçou @${mention.split("@")[0]} Durante 10 minutos viuuu!`, `Vish... Parece que as cartas se inverteram e @${sender.split("@")[0]} Foi totalmente molestado por @${mention.split("@")[0]} !`, `Bom... O @${sender.split("@")[0]} Acabou se revelando e deixando o @${mention.split("@")[0]} Se deliciar dele!`]


await client.sendMessage(from, {video: {url: "https://files.catbox.moe/s9dg6h.mp4"} , 
caption: choice_string(leg_mol), 
gifPlayback: true, 
mentions: [sender, mention]
  
}, { quoted: info })

return true;




default:
return false
}

  };
