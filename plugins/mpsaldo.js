import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["mpsaldo"];

export const handler = async ({ ham, from, isOwner }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpruyy" });
    }

    const { data } = await axios.get(
        `https://mustikapayment.com/api/saldo?user=${global.mpUser}`,
        {
            headers: {
                "X-Api-Key": global.mpApiKey,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    const rupiah = n => new Intl.NumberFormat("id-ID").format(n);

    const text = `Saldo Yang Tersisa:
  
Tersedia: ${rupiah(data.balance_available)}
Tertunda: ${rupiah(data.balance_pending)}`;

    await ham.sendMessage(from, { text });
};
