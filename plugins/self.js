import { global } from "../settings.js";

export const cmd = ["self"];

export const handler = async ({ ham, from }) => {
    if (global.self) {
        return ham.sendMessage(from, { text: "ini udh self jir_-" });
    }

    global.self = true
    ham.sendMessage(from, { text: "woke siap bosss bot dah di selff :v" });
};
