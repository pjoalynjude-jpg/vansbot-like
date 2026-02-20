export default {
  name: "tagall",
  description: "Mentionner tout le groupe (hidetag)",
  async execute(sock, msg, args) {
    const metadata = await sock.groupMetadata(msg.key.remoteJid)
    const members = metadata.participants.map(p => p.id)
    const text = args.join(" ") || "📢 Message du groupe"

    sock.sendMessage(msg.key.remoteJid, {
      text,
      mentions: members
    })
  }
}
