import axios from "axios";
import { randomUUID } from "node:crypto";

export const cmd = ["ffstalk"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, {
            text: "mana id nya jink_-"
        });
    }

    try {
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "X-Device": randomUUID()
        };

        // ambil token dulu
        const tokenRes = await axios.post(
            "https://api.duniagames.co.id/api/item-catalog/v1/get-token",
            { msisdn: "0812665588" },
            { headers }
        );

        if (tokenRes.data.status.code !== 0) {
            throw new Error(tokenRes.data.status.message);
        }

        const token = tokenRes.data.data.token;

        // inquiry FF
        const res = await axios.post(
            "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
            {
                productId: 3,
                itemId: 353,
                product_ref: "REG",
                product_ref_denom: "REG",
                catalogId: 376,
                paymentId: 1252,
                gameId: query,
                token,
                campaignUrl: ""
            },
            { headers }
        );

        const data = res.data;

        if (data.status.code !== 0) {
            return ham.sendMessage(from, {
                text: "gagal ambil data jir, id salah atau privat"
            });
        }

        const name = data.data?.gameDetail?.userName;

        if (!name) {
            return ham.sendMessage(from, {
                text: "username ga ketemu, kemungkinan id salah"
            });
        }

        const text = `[ FREE FIRE STALK ]*

ID: ${query}
Username: ${name}

> FrierenMD`;

        await ham.sendMessage(from, { text });

    } catch (err) {
        console.log(err);
        await ham.sendMessage(from, {
            text: "error wok, api nya mungkin lagi bermasalah"
        });
    }
};