export const cmd = ["gcinfo", "infogc", "gc"];

export const handler = async ({ ham, from, gmd }) => {
    if (!gmd) {
        return ham.sendMessage(from, { text: "khusus grup woi fakk lah" });
    }

    const participants = gmd.participants;

    const owner = gmd.ownerPn || gmd.owner;
    
    const admins = participants
        .filter(p => p.admin)
        .map(p => p.phoneNumber || p.id);

    const members = participants.map(p => p.phoneNumber || p.id);

    const text = `[ Group Information ]

• ID: ${gmd.id}
• Nama: ${gmd.subject}
• Desc: ${gmd.desc}
• Owner: @${owner.split("@")[0]}
• Total Member: ${gmd.size}

• Admin:
${admins.map(a => `- @${a.split("@")[0]}`).join("\n") || "-"}

• Member:
${members.map(m => `- @${m.split("@")[0]}`).join("\n")}

> FrierenMD
`;

    await ham.sendMessage(from, {
        text,
        mentions: [owner, ...admins, ...members]
    });
};
