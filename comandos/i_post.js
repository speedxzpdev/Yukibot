//Tire esta linha e coloque sua apikey
const { api_key } = require('../api')


module.exports = async function postdl(client, info, enviar, enviarImg2, reagir, fetchJson, texto_sem_cmd, texto_exato) {
  
  try {

  
await reagir("✨️")


const api_inst = await fetchJson(`https://darkstars-api.dscp.shop/api/download/instagramV2?url=${texto_exato}=&apikey=${api_key}`)

const meta = api_inst.resultado.metadata



let l_insta = `*Yuki Download*

*Username*:${meta.username}
*Titulo*:${meta.caption}
*Likes*:${meta.like}
*Comentários*:${meta.comment}
`

const fotoimg = api_inst.resultado.url

await reagir("😼")
for (const img of fotoimg) {
await enviarImg2(img, l_insta)
}

}
catch(i_err) {
  console.error("Ocorreu um erro aqui!", i_err)
  await reagir("💔")
  await enviar("Ocorreu um erro na api💔")
}

  
};