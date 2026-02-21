const fs = require("fs")

module.exports = {
  name: "setprivate",
  execute(sock, msg) {
    fs.writeFileSync("./mode.json", JSON.stringify({ mode: "private" }))
    sock.sendMessage(msg.key.remoteJid, { text: "🔒 Bot mis en mode *PRIVÉ*" })
  }
}
