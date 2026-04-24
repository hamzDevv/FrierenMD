import { generateWAMessageFromContent } from "@whiskeysockets/baileys";

export const cmd = ["btn", "button"];

export const handler = async ({ ham, from }) => {
    const msg = generateWAMessageFromContent(
    from,
    {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {},
                    body: { text: "Silakan pilih menu 😈" },
                    footer: { text: "FrierenMD" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "Menu",
                                    id: ".menu"
                                })
                            }
                        ]
                    }
                }
            }
        }
    },
    { userJid: ham.user.id }
);

    await ham.relayMessage(from, msg.message, {
        messageId: msg.key.id
    });
};