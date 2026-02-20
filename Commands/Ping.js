export default {
  name: "ping",
  description: "Tester la réponse du bot",
  execute(sock, msg) {
    sock.sendMessage(msg.key.remoteJid, {
      text: "🏓 Pong ! Bot actif ✅"
    })
  }
}
