import axios from "axios";

export const cmd = ["brat"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana teks nya jink_-" });
    }

    const { data } = await axios.get(
        `https://api-varhad.my.id/maker/brat?text=${query}`,
        {
            responseType: "arraybuffer"
        }
    );

    await ham.sendMessage(from, {
        sticker: data,
        author: "FrierenMD"
    });
};
