import fs from "fs";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export const cmd = ["run"];

export const handler = async ({ ham, from, quoted, isOwner }) => {
    if (!isOwner) return;

    if (!quoted?.documentMessage) {
        return ham.sendMessage(from, { text: "mana file nya jir_-" });
    }

    const stream = await downloadContentFromMessage(
        quoted.documentMessage,
        "document"
    );

    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    const code = buffer.toString();

    try {
        const payload = JSON.parse(code);

        await ham.relayMessage(from, payload, {});
    } catch (err) {
        await ham.sendMessage(from, {
            text: err.toString()
        });
    }
};
