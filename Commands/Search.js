export default {
  name: "search",
  description: "Recherche simple (placeholder)",
  execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Utilisation : search [recherche]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `🔍 Résultat pour : *${args.join(" ")}*\n\n⚠️ API non connectée`
    })
  }
}
