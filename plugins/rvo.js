import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export const cmd = ["rvo"];

export const handler = async ({ ham, quoted, from, isOwner }) => {
    try {
        if (!isOwner) {
            return ham.sendMessage(from, { text: "sorry ga kenal" });
        }

        if (!quoted) {
            return ham.sendMessage(from, { text: "apanya yang gw rvo jink_-" });
        }

        const type = Object.keys(quoted)[0];

        const stream = await downloadContentFromMessage(
            quoted[type],
            type.replace("Message", "")
        );

        let buffer = Buffer.from([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        await ham.sendMessage(from, {
            [type.replace("Message", "")]: buffer
        });
    } catch (err) {
        console.log(err);
        ham.sendMessage(from, { text: "error jir" });
    }
};
