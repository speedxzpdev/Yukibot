module.exports = async function reelsdl(client, info, enviar, enviarVd2, reagir, fetchJson, texto_sem_cmd) {
  
  try {
  if (!texto_sem_cmd) {
    await enviar("Preciso do link do que deseja baixar!")
  return
  }

await reagir("✨️")
await enviar("Só um momento...")

const api_inst = await fetchJson(`https://darkstars-api.dscp.shop/api/download/instagramV2?url=${texto_sem_cmd}&apikey=dark_key:3DSJ6YX7`)


let l_insta = `*Yuki Categoria instagram*

❒ *Username*:${api_inst.resultado.metadata.username}
❒ *Titulo*:${api_inst.resultado.metadata.caption}
❒ *Likes*:${api_inst.resultado.metadata.like}
❒ *Comentários*:${api_inst.resultado.metadata.comment}
`

await reagir("😼")
await enviarVd2(api_inst.resultado.url, l_insta)


}
catch(i_err) {
  console.error("Ocorreu um erro aqui!", i_err)
  await reagir("💔")
  await enviar("Ocorreu um erro na api💔")
}

  
};