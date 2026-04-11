import fs from "fs";

export const cmd = ["menfess"];

export const handler = async ({ ham, from, query }) => {
    const dbPath = "./database/menfess.json";

    const loadDB = () => JSON.parse(fs.readFileSync(dbPath));
    const saveDB = data =>
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    if (!query.includes("|")) {
        return await ham.sendMessage(from, {
            text: "gini woii: .menfess 628xxx|pesan"
        });
    }

    const [target, pesan] = query.split("|");

    const jid = target.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    let db = loadDB();

    db[from] = jid;
    db[jid] = from;

    saveDB(db);

    const text = `
*_[ Pesan Dari Seseorang ]_*

Pesan : ${pesan}

> Anda mendapatkan pesan ini dikarenakan seseorang menghubungi anda dengan perantara bot ( saya ) untuk mengirim pesan kepada anda
    `;

    await ham.sendMessage(jid, {
        text
    });

    await ham.sendMessage(from, {
        text: "✅ Menfess terkirim"
    });
};

