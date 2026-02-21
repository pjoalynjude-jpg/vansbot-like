module.exports = {
  name: "ai",
  execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🤖 Utilise : !ai [message]"
      })
    }

    const question = args.join(" ")

    sock.sendMessage(msg.key.remoteJid, {
      text: `🤖 IA (démo)\n\nTu as dit : "${question}"`
    })
  }
          }
