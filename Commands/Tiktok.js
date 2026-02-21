module.exports = {
  name: "tiktok",
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🎵 Utilise : !tiktok [lien]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `🎵 TikTok reçu :\n${args[0]}\n\n📥 Téléchargement bientôt disponible`
    })
  }
}
