module.exports = {
  name: "help",
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❓ Utilise : !help [commande]\nEx: !help ping"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `ℹ️ Aide pour la commande *${args[0]}*`
    })
  }
}
