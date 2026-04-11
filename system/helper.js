import { global } from "../settings.js";

export const helper = ({ msg }) => {
    const user = msg.pushName;
    const sender = msg.key.participantAlt || msg.key.remoteJidAlt;
    const isOwner = global.owner.includes(sender);
    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const isSelf = global.self

    return (isGroup, isOwner, user, isSelf);
};
