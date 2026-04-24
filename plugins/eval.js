import util from "util";

export const cmd = [">"];

export const handler = async ({ ham, from, query, isOwner }) => {
    if (!isOwner) return;

    try {
        let result = await eval(`(async () => { ${query} })()`);

        if (result === undefined) return;

        if (typeof result !== "string") {
            result = util.inspect(result);
        }

        await ham.sendMessage(from, { text: result });
        
    } catch (err) {
        await ham.sendMessage(from, { text: err.toString() });
    }
};
