import axios from "axios";

export const cmd = ["ytplay", "ytp"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "cari apaan" });
    }

    const { data } = await axios.get(
        `https://api-varhad.my.id/search/ytplay?q=${query}`
    );

    const { title, url, duration, thumbnail, mp3 } = data.result;
    const caption = `${title} — ${duration}`;

    await ham.sendMessage(from, { image: { url: thumbnail }, caption });
    await ham.sendMessage(from, { audio: { url: mp3 }, mimetype: "audio/mpeg" });
};
