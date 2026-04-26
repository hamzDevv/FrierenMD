import fs from "fs";

export const cmd = ["unbangc", "unban"];

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

    if (!db.find(d => d.id === id)) {
        return ham.sendMessage(from, { text: "ini emg ga di ban jir" });
    }

    db = db.filter(d => d.id !== id);

    saveDB(db);

    const text = `[ Unban Group ]
   
Nama Group: ${subject}
ID Group: ${id}
Status: Banned Dibuka

> FrierenMD
`;
    await ham.sendMessage(from, { text });
};
