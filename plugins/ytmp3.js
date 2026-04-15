import axios from "axios"

export const cmd = ["ytmp3"] 

export const handler = async ({ham, from, query}) => {
  if(!query) {
    return ham.sendMessage(from, {text: "mana link nya"})
  }
  
  const {data} = await axios.get(`https://api-varhad.my.id/download/ytmp3?url=${query}`)
  
  await ham.sendMessage(from, {audio: {url: data.download}, mimetype: "audio/mpeg"})
}