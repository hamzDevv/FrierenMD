import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["fpproduk"];

export const handler = async ({ ham, from, query, isOwner }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mau cari apa kink" });
    }
    
    let fee = 2500 // buwat ngambil untung yakali jualan gada untung wkwkwk 
    if(isOwner) fee = 0

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
        const rupiah = r => new Intl.NumberFormat("id-ID").format(r || 0);
        text += `
ID: ${r.id}
Nama: ${r.name}
Harga: Rp${rupiah(Number(r.price) + fee)}/K
Min ${r.min} || Max ${r.max}
Refill: ${r.refill}
`;
    });

    await ham.sendMessage(from, { text });
};
