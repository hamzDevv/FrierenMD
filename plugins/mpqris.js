import axios from "axios";
import QRCode from "qrcode";
import { global } from "../settings.js";

export const cmd = ["mpqris", "qr", "qris"];

export const handler = async ({ ham, from, query, isOwner }) => {
    if (!isOwner) {
        return ham.sendMessage(from, { text: "lau sape mpruyy" });
    }

    const [amount, customer_name, product_name] = query.split("|");

    const { data } = await axios.post(
        "https://mustikapayment.com/api/createpay",
        {
            amount,
            customer_name,
            product_name
        },
        {
            headers: {
                "X-Api-Key": global.mpApiKey,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    const qr = await QRCode.toBuffer(data.qr_content);

    const caption = `QRIS berhasil dibuat!

ID: ${data.ref_no}
Jumlah Total: ${data.amount}

Silahkan scan qr diatas`;

    await ham.sendMessage(from, { image: qr, caption });
};
