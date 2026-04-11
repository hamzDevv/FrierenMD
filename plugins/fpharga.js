import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["fpharga"];

export const handler = async ({ ham, from, query, isOwner }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpruyy" });
    }

    if (!query.includes("|")) {
        return ham.sendMessage(from, {
            text: "harga apanya jink_-"
        });
    }

    const [id, jumlah] = query.split("|");

    const qty = parseInt(jumlah);

    const { data } = await axios.post("https://fayupedia.id/api/services", {
        api_id: global.fpApiID,
        api_key: global.fpApiKey
    });

    const service = data.services.find(s => s.id == id);

    if (!service) {
        return ham.sendMessage(from, {
            text: "gada jir"
        });
    }

    const pricePer1000 = service.price;
    const total = Math.ceil((qty / 1000) * pricePer1000);

    const text = `
${service.name}

Jumlah: ${qty}
Harga/K: ${pricePer1000}
Total: ${total}
`;

    await ham.sendMessage(from, { text });
};
