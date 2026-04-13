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
│ • .rvo
│ • .fpsaldo
│ • .fpsuntik
╰━━━━━━━━━━━━━━━━━╯ 

╭➣ *『 Main Menu 』*
│ • .ai
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Suntik Menu 』*
│ • .fpproduk
│ • .fpstatus
│ • .fpharga
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Random Menu 』*
│ • .quotes
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Bot Status 』*
│ • .ping
│ • .runtime
╰━━━━━━━━━━━━━━━━━╯

> *_${global.bot}_*
`;
    ham.sendMessage(from, { image: { url: img }, caption });
};
