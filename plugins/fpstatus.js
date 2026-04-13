import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["fpstatus"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana id nya kink" });
    }

    let text;
    try {
        const { data } = await axios.post("https://fayupedia.id/api/status", {
            api_id: global.fpApiID,
            api_key: global.fpApiKey,
            id: query
        });

        text = `${data.msg}

ID: ${data.order_id}
Di Isi: ${data.remains}
Jumlah Awal: ${data.start_count}
Status: ${data.order_status}
  `;
    } catch (err) {
        text = "pesanan tak di temukan lah";
    }

    await ham.sendMessage(from, { text });
};
