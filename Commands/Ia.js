export default {
  name: "ia",
  description: "IA basique (simulation)",
  execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Utilisation : ia [question]"
      })
    }

    sock.sendMessage(msg.key.remoteJid, {
      text: `🤖 IA :\nJe réfléchis à "${args.join(" ")}"...\n\n⚠️ IA réelle non connectée`
    })
  }
}
