module.exports = async function exit(info, from, reagir, enviar, donos, client) {
  
  
const sender = info.key.participant || info.key.remoteJid;
  
  if (!donos.includes(sender)) {
  await enviar("Nossa... Quer me remover do grupo mesmo?")
  return
}
await reagir("💤")
await enviar("Bye bye!")
await client.groupLeave(from)

  
}