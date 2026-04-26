import axios from "axios";

export const cmd = ["yts"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "cari apaan" });
    }

    const { data } = await axios.get(
        `https://api-varhad.my.id/search/youtube?q=${query}`
    );

    const result = data.result;
    let text = "hmm keknya error deh :v";
    result.map((r, i) => {
        text = `Title: ${r.title}
Channel: ${r.channel}
Duration: ${r.duration}
Link: ${r.link}

`;
    });

    await ham.sendMessage(from, { text });
};
