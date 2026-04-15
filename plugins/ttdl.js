import axios from "axios";

export const cmd = ["tiktok", "tt", "ttdl"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana linknya woii_-" });
    }

    ham.sendMessage(from, { text: "loding" });

    try {
        const { data } = await axios.get(
            `https://api-varhad.my.id/download/tt?url=${query}`
        );

        const video = data.result.mp4_hd
        const audio = data.result.mp3
        const caption = `
[ Tiktok Downloader ]

${data.result.title}

> FrierenMD
`;

        await ham.sendMessage(from, {
            video: { url: video },
            mimetype: "video/mp4",
            caption,
        });
        
        await ham.sendMessage(from, {audio: {url: audio}, mimetype: "audio/mpeg"})
    } catch (err) {
        console.log(err);
        ham.sendMessage(from, { text: "error wok" });
    }
};
