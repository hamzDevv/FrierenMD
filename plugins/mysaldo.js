import supabase from "../system/supabase.js";

export const cmd = ["mysaldo"];

export const handler = async ({ ham, from, sender }) => {
    const { data } = await supabase
        .from("users")
        .select("*")
        .eq("jid", sender)
        .single();

    if (!data) {
        return ham.sendMessage(from, {
            text: "kamu belum pernah transaksi sebelumnya, ketik .topup (nominal) untuk menambah saldo kamu"
        });
    }

    const rupiah = n => new Intl.NumberFormat("id-ID").format(n || 0);

    const text = `Saldo Yang Tersisa:
  
Rp${rupiah(data.saldo)}

ketik .topup (nominal) untuk menambah saldo`;

    await ham.sendMessage(from, { text });
};
