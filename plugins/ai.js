export const cmd = ["ai"];

export const handler = async ({ ham, from, query }) => {
    if (!query) {
        return ham.sendMessage(from, {text: "Contoh: .ai hello wokkkk"});
    }

    const res = await fetch(
        `https://lax-orpin.vercel.app/api/ai/lax?q=${query}`
    );
    const { result } = await res.json();

    ham.sendMessage(from, { text: result });
};
