export default {
  name: "youtube",
  alias: ["yt"],
  description: "Lien YouTube (placeholder)",
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Utilisation : youtube [lien]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `▶️ Lien YouTube reçu :\n${args[0]}\n\n⚠️ Téléchargement non activé`
    })
  }
}
