import axios from "axios";
import { global } from "../settings.js";
import supabase from "../system/supabase.js";

export const cmd = ["confirm"];

export const handler = async ({ ham, from, query, sender }) => {
    if (!query) {
        return ham.sendMessage(from, { text: "mana id nya kink" });
    }

    const trxId = query.trim();

    const { data: trx } = await supabase
        .from("transaction")
        .select("*")
        .eq("trx_id", trxId)
        .single();

    if (!trx) {
        return ham.sendMessage(from, { text: "pembayaran tidak ditemukan" });
    }

    if (trx.jid !== sender) {
        return ham.sendMessage(from, { text: "ini mah bukan punyamu_-" });
    }

    if (trx.status === "success") {
        return ham.sendMessage(from, { text: "transaksi berhasil" });
    }

    try {
        const { data } = await axios.get(
            `https://mustikapayment.com/api/cekpay?ref_no=${query}`,
            {
                headers: {
                    "X-Api-Key": global.mpApiKey,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        if (data.status !== "success") {
            return ham.sendMessage(from, { text: "belum lu bayar jir" });
        }

        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("jid", sender)
            .single();

        if (!user) {
            await supabase.from("users").insert([
                {
                    jid: sender,
                    saldo: trx.amount
                }
            ]);
        } else {
            await supabase
                .from("users")
                .update({ saldo: user.saldo + trx.amount })
                .eq("jid", sender);
        }

        await supabase
            .from("transaction")
            .update({ status: "success", trx_with: data.issuer })
            .eq("trx_id", trxId);

        const { data: newUser } = await supabase
            .from("users")
            .select("*")
            .eq("jid", sender)
            .single();

        const rupiah = n => new Intl.NumberFormat("id-ID").format(n || 0);

        const text = `Pembayaran Berhasil:
    
Metode: ${data.type || "—"}
Dibayar Dengan: ${data.issuer || "—"}
Jumlah: ${rupiah(data.amount || trx.amount)}
Status: ${data.status || "success"}

Total Saldo Kamu: Rp${newUser.saldo}

> FrierenMD`;

        return await ham.sendMessage(from, { text });
    } catch (err) {
        console.log(err);
        ham.sendMessage(from, {
            text: "terjadi kesalahan wok coba ulang lagi"
        });
    }
};
