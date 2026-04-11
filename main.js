import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";
import pino from "pino";
import { global } from "./settings.js";
import fs from "fs";

import { loadPlugins, handleCommand } from "./system/handler.js";
import { helper } from "./system/helper.js";

const dbMF = "./database/menfess.json";
const loadMF = () => JSON.parse(fs.readFileSync(dbMF));
const saveMF = data => fs.writeFileSync(dbMF, JSON.stringify(data, null, 2));

await loadPlugins();
const logger = pino({ level: "silent" });

async function connectToWhatsapp() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const ham = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        logger,
        printQRInTerminal: false,
        browser: ["Linux", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false
    });

    const requestPairing = async () => {
        if (!ham.authState.creds.registered) {
            try {
                const phoneNumber = String(global.number).replace(
                    /[^0-9]/g,
                    ""
                );
                if (!phoneNumber) {
                    console.log("Nomor telepon tidak valid di settings.js");
                    return;
                }

                console.log("Sedang meminta pairing code...");
                await new Promise(res => setTimeout(res, 6000));

                const code = await ham.requestPairingCode(
                    phoneNumber,
                    "FRIERENN"
                );
                console.log("==============================");
                console.log("PAIRING CODE ANDA:", code);
                console.log("==============================");
            } catch (err) {
                console.log("Gagal mendapatkan pairing code:", err.message);
            }
        }
    };

    if (!ham.authState.creds.registered) {
        await requestPairing();
    }

    ham.ev.on("creds.update", saveCreds);

    ham.ev.on("connection.update", async update => {
        const { connection, lastDisconnect, qr } = update;

        if (connection === "connecting") {
            console.log("Sedang menghubungkan ke WhatsApp...");
        }

        if (connection === "open") {
            console.log("Berhasil Terhubung ke WhatsApp!");
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;
            const message = lastDisconnect?.error?.message;
            console.log(`Koneksi Terputus. Alasan: ${reason} (${message})`);

            if (reason === DisconnectReason.loggedOut) {
                console.log("Sesi telah keluar. Menghapus folder session...");
                if (fs.existsSync("./session")) {
                    fs.rmSync("./session", { recursive: true, force: true });
                }
                process.exit(0);
            } else if (reason === 428 || reason === 405) {
                console.log(
                    "Terjadi gangguan pairing/koneksi. Mencoba menghubungkan ulang dalam 10 detik..."
                );
                setTimeout(() => {
                    connectToWhatsapp();
                }, 10000);
            } else {
                console.log("Menghubungkan ulang dalam 5 detik...");
                setTimeout(() => {
                    connectToWhatsapp();
                }, 5000);
            }
        }
    });

    ham.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (msg.key.fromMe) return;
        const user = msg.pushName;
        const from = msg.key.remoteJid || msg.key.participant;
        const text =
            msg.message?.conversation || msg.message?.extendedTextMessage?.text;

        if (!text) return;

        let mf = loadMF();

        if (mf[from]) {
            const target = mf[from];

            if (text === ".stop") {
                delete mf[from];
                delete mf[target];
                saveMF(mf);

                await ham.sendMessage(target, {
                    text: "pesan ini telah dihentikan!"
                });

                await ham.sendMessage(from, {
                    text: "berhasil"
                });

                return;
            }

            await ham.sendMessage(target, {
                text: `╭➣ ${text}`
            });

            return;
        }

        const prefix = global.prefix;
        const args = text.slice(prefix.length).split(" ");
        const cmd = args.shift().toLowerCase();
        const query = args.join(" ");
        const sender = msg.key.participantAlt || msg.key.remoteJidAlt;
        const isOwner = global.owner.includes(sender);
        const isGroup = msg.key.remoteJid.endsWith("@g.us");
        const isSelf = global.self;
        const quoted =
            msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        // if (!text.startsWith(prefix) || (isSelf && !isOwner)) return;

        helper({ msg });
        await handleCommand({
            ham,
            msg,
            from,
            user,
            cmd,
            query,
            isOwner,
            isGroup,
            isSelf,
            quoted
        });

        const mode = isGroup ? "Group" : "Private";

        const anu = `
Dari: ${user}
Pesan: ${text}
Mode: ${mode}
Owner: ${isOwner}
`;

        console.log(anu);
    });
}

connectToWhatsapp();
