import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["suntik", "fpsuntik"];

export const handler = async ({ ham, from, isOwner, query }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpruyy" });
    }

    if (!query) {
        return ham.sendMessage(from, {
            text: "gini woe: .suntik id|target|jumlah"
        });
    }

    const [service, target, quantity] = query.split("|");

let text
    try {
        const { data } = await axios.post("https://fayupedia.id/api/order", {
            api_id: global.fpApiID,
            api_key: global.fpApiKey,
            service,
            target,
            quantity
        });

        text = `order berhasil cik tinggal tunggu proses masuknya aja :v btw nih id ordernya ${data.order}`;
    } catch (err) {
        text = "order gagal cik saldonya ga cukup :v";
    }

    await ham.sendMessage(from, { text });
};
