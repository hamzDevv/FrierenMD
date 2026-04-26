import fs from "fs";

export const cmd = ["crm"];

export const handler = async ({ ham, from, msg, isOwner, store }) => {
    if (!isOwner) return;

    const dir = "./tmp";

    if (!fs.existSync(dir)) {
        fs.mkdirSync(dir);
    }

    const quotedId = msg.message?.extendedTextMessage?.contextInfo?.stanzaId;

    if (!quotedId) {
        return ham.sendMessage(from, { text: "reply pesan dulu jir" });
    }

    const data = store[quotedId];

    if (!data) {
        return ham.sendMessage(from, { text: "ga kedetek wok" });
    }

    const payload = data.message;

    const filename = `${dir}/${Date.now()}.js`;

    const content = JSON.stringify(payload, null, 2);

    fs.writeFileSync(filename, content);

    await ham.sendMessage(from, {
        document: fs.readFileSync(filename),
        fileName: "byeFrierenYgy.js",
        mimetype: "application/javascript"
    });
};
