module.exports = {
  name: "tagall",
  async execute(sock, msg, args) {
    if (!msg.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Cette commande est réservée aux groupes"
      })
    }

    const text = args.join(" ") || "📢 Mention générale"
    const metadata = await sock.groupMetadata(msg.key.remoteJid)
    const mentions = metadata.participants.map(p => p.id)

    await sock.sendMessage(
      msg.key.remoteJid,
      { text, mentions }
    )
  }
}
