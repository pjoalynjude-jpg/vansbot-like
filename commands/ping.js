module.exports = {
  name: "ping",
  execute(sock, msg) {
    sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong !" })
  }
}
