import { global } from "../settings.js";

export const cmd = ["public"];

export const handler = async ({ ham, from }) => {
    if (!global.self) {
        return ham.sendMessage(from, { text: "ini udh public jir_-" });
    }

    global.self = false;
    ham.sendMessage(from, { text: "woke siap bosss bot dah di public :v" });
};
