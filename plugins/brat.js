// import axios from "axios";
// import sharp from "sharp"

// export const cmd = ["brat"];

// export const handler = async ({ ham, from, query }) => {
//     if (!query) {
//         return ham.sendMessage(from, { text: "mana teks nya jink_-" });
//     }

//     const { data } = await axios.get(
//         `https://api-varhad.my.id/maker/brat?text=${query}`,
//         {
//             responseType: "arraybuffer"
//         }
//     );
    
//     const sticker = await sharp(data).webp().toBuffer()

//     await ham.sendMessage(from, {
//         sticker,
//         author: "FrierenMD"
//     });
// };
