module.exports = async function exit(info, from, reagir, enviar, donos, client) {
  
  
const sender = info.key.participant || info.key.remoteJid;
  
  if (!donos.includes(sender)) {
  await enviar("?")
  return
}
await reagir("💤")
await client.groupLeave(from)

  
}