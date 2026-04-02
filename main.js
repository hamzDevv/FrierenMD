import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";
import pino from "pino";
import { global } from "./settings.js";
import fs from "fs";

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
        browser: ["Ubuntu", "Chrome", "20.0.04"],
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

                const code = await ham.requestPairingCode(phoneNumber);
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
}

connectToWhatsapp();
