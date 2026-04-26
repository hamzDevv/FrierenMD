// import { downloadContentFromMessage } from "@whiskeysockets/baileys";
// import sharp from "sharp"

// export const cmd = ["s", "sticker"];

// export const handler = async ({ ham, from, quoted }) => {
//     if (!quoted) {
//         return ham.sendMessage(from, { text: "mana gambarnya jink_-" });
//     }
    
//     const stream = await downloadContentFromMessage(quoted.imageMessage, "image")
    
//     let buffer = Buffer.from([])
    
//     for await (const chunk of stream) {
//       buffer = Buffer.concat([buffer, chunk])
//     }
    
//     const sticker = await sharp(buffer).webp().toBuffer()
    
//     await ham.sendMessage(from, {
//         sticker
//     });
// };
