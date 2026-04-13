import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["fpproduk"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mau cari apa kink" });
    }

    const { data } = await axios.post("https://fayupedia.id/api/services", {
        api_id: global.fpApiID,
        api_key: global.fpApiKey
    });

    const q = query.toLowerCase();

    const result = data.services.filter(
        s =>
            s.name.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q)
    );

    let text = `[${result.length} Produk Tersedia]\n`;
    result.forEach((r, i) => {
        const price = new Intl.NumberFormat("id-ID").format(r.price);
        text += `
ID: ${r.id}
Nama: ${r.name}
Harga: Rp${price}/K
Min ${r.min} || Max ${r.max}
Refill: ${r.refill}
`;
    });

    await ham.sendMessage(from, { text });
};
