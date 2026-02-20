export default {
  name: "tiktok",
  description: "Lien TikTok (placeholder)",
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Utilisation : tiktok [lien]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `🎵 Lien TikTok reçu :\n${args[0]}\n\n⚠️ Téléchargement non activé`
    })
  }
}
