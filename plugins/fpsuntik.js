import axios from "axios";
import supabase from "../system/supabase.js";
import { global } from "../settings.js";

export const cmd = ["fpsuntik"];

export const handler = async ({ ham, from, query, sender }) => {
    if (!query) {
        return ham.sendMessage(from, {
            text: "gini woe: .fpsuntik id|target|jumlah\nbtw kalo mau cari id nya ketik .fpproduk tiktok followers (misal)"
        });
    }
    
    const fee = 2500

    const [service, target, quantity] = query.split("|");

    if (!service || !target || !quantity) {
        return ham.sendMessage(from, {
            text: "isi yang bener napa? ginih .fpsuntik idproduk|target|jumlah(pke angka yaww) kalo belum tau id produk bisa di cek pke .fpproduk tiktok followers (misal)"
        });
    }

    if (isNaN(quantity) || isNaN(service)) {
        return ham.sendMessage(from, {
            text: "jumlah ama id cuma boleh dimasukin angka bro contoh .fpsuntik 123|@hamjett|7000"
        });
    }

    const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("jid", sender)
        .single();

    if (!user) {
        return ham.sendMessage(from, {
            text: "kamu belum punya saldo bro, ketik .topup nominal untuk menambah saldo"
        });
    }

    const { data: srv } = await axios.post(
        "https://fayupedia.id/api/services",
        {
            api_id: global.fpApiID,
            api_key: global.fpApiKey
        }
    );

    const produk = srv.services.find(s => s.id == service);

    if (!produk) {
        return ham.sendMessage(from, {
            text: "gada jir"
        });
    }

    if (quantity < produk.min || quantity > produk.max) {
        return ham.sendMessage(from, {
            text: `minimal isi: ${produk.min}, maksimal isi: ${produk.max}`
        });
    }

    const pricePer1000 = produk.price;
    const qty = Number(quantity);
    const total = Math.ceil((qty / 1000) * pricePer1000 + fee);
    const rupiah = n => new Intl.NumberFormat("id-ID").format(n || 0);

    if (user.saldo < total) {
        return ham.sendMessage(from, {
            text: `saldomu ga cukup bro:\n\nsaldo: Rp${rupiah(user.saldo)}\nsedangkan harganya: Rp${rupiah(total)}\n\nketik .topup nominal buat isi ulang`
        });
    }

    let text;
    try {
        const { data } = await axios.post("https://fayupedia.id/api/order", {
            api_id: global.fpApiID,
            api_key: global.fpApiKey,
            service,
            target,
            quantity
        });

        text = `order berhasil cik tinggal tunggu proses masuknya aja :v btw nih id ordernya ${data.order}\noh iya saldomu sisa Rp${rupiah(user.saldo - total)}\n\nbtw kalo mau isi lagi tinggal .topup nominal yoww :v`;

        await supabase
            .from("users")
            .update({ saldo: user.saldo - total })
            .eq("jid", sender);
    } catch (err) {
        text =
            "order gagal cik saldo dari owner ga cukup :v silahkan hubungi owner untuk konfirmasi";
    }

    await ham.sendMessage(from, { text });
};
