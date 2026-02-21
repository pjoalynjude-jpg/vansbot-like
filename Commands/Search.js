module.exports = {
  name: "search",
  execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🔎 Utilise : !search [recherche]"
      })
    }

    const query = args.join(" ")

    sock.sendMessage(msg.key.remoteJid, {
      text: `🔎 Résultat de recherche (démo)\n\nRecherche : *${query}*`
    })
  }
}
