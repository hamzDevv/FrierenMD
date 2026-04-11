import axios from "axios";

export const cmd = ["tiktok", "tt", "ttdl"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana linknya woii_-" });
    }

    ham.sendMessage(from, { text: "loding" });

    try {
        const { data } = await axios.get(
            `https://api.beraknew.web.id/api/download/tiktok?url=${query}`
        );

        const video = data.data.links?.find(n =>
            n.name.toLowerCase().includes("video")
        )?.url;
        const audio = data.data.links?.find(n =>
            n.name.toLowerCase().includes("mp3")
        )?.url;
        const caption = `
[ ${data.data.author} ]

${data.data.title}

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
