import axios from "axios";
import { global } from "../settings.js";

export const cmd = ["mpstatus"];

export const handler = async ({ ham, from, isOwner, query }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpruyy" });
    }

    const { data } = await axios.get(
        `https://mustikapayment.com/api/cekpay?ref_no=${query}`,
        {
            headers: {
                "X-Api-Key": global.mpApiKey,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );
    
    const rupiah = n => new Intl.NumberFormat("id-ID").format(n);

    const text = `Status Pembayaran:
    
Nama Customer: ${data.payor}
Metode: ${data.type}
Dibayar Dengan: ${data.issuer}
Jumlah: ${rupiah(data.amount)}
Status: ${data.status}
`;

    await ham.sendMessage(from, { text });
};
