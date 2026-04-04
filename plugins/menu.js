import { global } from "../settings.js";

export const cmd = ["menu"];

export const handler = async ({ ham, from, user }) => {
    const img =
        "https://i.ibb.co.com/PZb0xZpk/Picsart-26-04-04-15-34-04-386.jpg";

    const caption = `
╭➣ *⚚ ${global.bot} — ${global.version} ⚚*
│ *User:* *${user}*
│ *Botname:* *${global.bot}*
│ *Version:* *${global.version}*
│ *Developer:* *${global.developer}*
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Owner Menu 』*
│ • .self
│ • .public
╰━━━━━━━━━━━━━━━━━╯ 

╭➣ *『 Main Menu 』*
│ • .ai
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Search Menu 』*
│ • .lirik
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Random Menu 』*
│ • .quotes
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Fun Menu 』*
│ • .ping
│ • .runtime
╰━━━━━━━━━━━━━━━━━╯

> *_${global.bot}_*
`;
    ham.sendMessage(from, { image: { url: img }, caption });
};
