import fs from "fs";

export const cmd = ["bangc", "ban"];

export const handler = async ({ ham, from, gmd, isOwner }) => {
    if (!isOwner) return;
    if (!gmd) {
        return ham.sendMessage(from, { text: "khusus grup" });
    }

    const path = "./database/bangc.json";

    const loadDB = () => {
        if (!fs.existsSync(path)) return [];
        try {
            return JSON.parse(fs.readFileSync(path));
        } catch (err) {
            return [];
        }
    };

    const saveDB = d => fs.writeFileSync(path, JSON.stringify(d, null, 2));

    const { id, subject } = gmd;

    let db = loadDB();

    if (db.find(d => d.id === id)) {
        return ham.sendMessage(from, { text: "dah di ban jir_-" });
    }

    db.push({ subject, id });

    saveDB(db);

    const text = `[ Ban Group ]
   
Nama Group: ${subject}
ID Group: ${id}
Status: Grup Di Banned Dari Bot (gabisa pke frierenMD :v)

> FrierenMD
`;
    await ham.sendMessage(from, { text });
};
