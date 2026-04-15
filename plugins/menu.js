import { global } from "../settings.js";
import supabase from "../system/supabase.js";

export const cmd = ["menu"];

export const handler = async ({ ham, from, user, sender }) => {
    const img =
        "https://i.ibb.co.com/PZb0xZpk/Picsart-26-04-04-15-34-04-386.jpg";

    // ambil data user
    const { data: u } = await supabase
        .from("users")
        .select("*")
        .eq("jid", sender)
        .single();

    const saldo = u?.saldo || 0;

    const rupiah = n => new Intl.NumberFormat("id-ID").format(n);

    const caption = `
╭➣ *⚚ ${global.bot} — ${global.version} ⚚*
│ *User:* *${user}*
│ *Botname:* *${global.bot}*
│ *Version:* *${global.version}*
│ *Developer:* *${global.developer}*
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 User Info 』*
│ • ID: ${sender}
│ • Saldo: Rp${rupiah(saldo)}
│ • Status: ${saldo > 50000 ? "CEO" : "RAKYAT JELATA"}
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Transaction Menu 』*
│ • .topup
│ • .confirm
│ • .mysaldo
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Owner Menu 』*
│ • .self
│ • .public
│ • .rvo
│ • .fpsaldo
│ • .mpsaldo
╰━━━━━━━━━━━━━━━━━╯ 

╭➣ *『 Main Menu 』*
│ • .ai
╰━━━━━━━━━━━━━━━━━╯

╭➣ *『 Suntik Menu 』*
│ • .fpproduk
│ • .fpstatus
│ • .fpharga
│ • .fpsuntik
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

    await ham.sendMessage(from, {
        image: { url: img },
        caption
    });
};
