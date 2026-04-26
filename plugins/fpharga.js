import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["fpharga"];

export const handler = async ({ ham, from, query, isOwner }) => {
    if (!query.includes("|")) {
        return ham.sendMessage(from, {
            text: "harga apanya jink_-"
        });
    }

    let fee = 2500;
    if (isOwner) fee = 0;

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

    const rupiah = number => new Intl.NumberFormat("id-ID").format(number);

    const pricePer1000 = service.price;
    const total = Math.ceil((qty / 1000) * pricePer1000 + fee);

    const text = `${service.name}

Jumlah: ${qty}
Harga/K: Rp${rupiah(pricePer1000)}
Total: Rp${rupiah(total)}
`;

    await ham.sendMessage(from, { text });
};
