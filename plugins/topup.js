import axios from "axios";
import QRCode from "qrcode";
import supabase from "../system/supabase.js";
import { global } from "../settings.js";

export const cmd = ["topup"];

export const handler = async ({ ham, from, query, sender }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "masukin nominalnya kak" });
    }
    
    if (isNaN(query)) {
        return ham.sendMessage(from, { text: "masukin angka aja kink" });
    }

    const amount = Number(query);

    const { data } = await axios.post(
        "https://mustikapayment.com/api/createpay",
        {
            amount,
            product_name: "TopUp Saldo"
        },
        {
            headers: {
                "X-Api-Key": global.mpApiKey,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    await supabase.from("transaction").insert([
        {
            jid: sender,
            amount,
            trx_id: data.ref_no,
            trx_with: "pending",
            status: "pending"
        }
    ]);

    const qr = await QRCode.toBuffer(data.qr_content);

    const caption = `QRIS berhasil dibuat!

ID: ${data.ref_no}
Jumlah Total: ${data.amount}

Silahkan scan qr diatas

Salin dan tempel teks dibawah ini untuk konfirmasi pembayaran!`;

    await ham.sendMessage(from, { image: qr, caption });
    await ham.sendMessage(from, { text: `.confirm ${data.ref_no}` });
};
