import axios from "axios";

export const cmd = ["ytmp4"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana link nya woee" });
    }

    const { data } = await axios.get(
        `https://api-varhad.my.id/download/ytmp4?url=${query}`
    );
    const { title, videos, duration } = data.result;
    const video = videos.find(l => l.label == "480p");
    const capton = `[ Youtube Video Downloader ]

Title: ${title}
Duration: ${duration}

> FrierenMD`;

    await ham.sendMessage(from, { video: { url: video }, caption });
};
