module.exports = {
  name: "youtube",
  alias: ["yt"],
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "📺 Utilise : !youtube [lien]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `📺 YouTube reçu :\n${args[0]}\n\n📥 Téléchargement bientôt disponible`
    })
  }
      }
