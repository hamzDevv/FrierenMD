import axios from "axios";
import { global } from "../settings.js";
export const cmd = ["fpsaldo"];

export const handler = async ({ ham, from, isOwner }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpuryy" });
    }

    const { data } = await axios.post("https://fayupedia.id/api/balance", {
        api_id: global.fpApiID,
        api_key: global.fpApiKey
    });

    const text = `saldonya sisa ${data.balance} :v`;

    await ham.sendMessage(from, { text });
};
