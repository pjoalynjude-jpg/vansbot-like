const fs = require("fs")

module.exports = {
  name: "setpublic",
  execute(sock, msg) {
    fs.writeFileSync("./mode.json", JSON.stringify({ mode: "public" }))
    sock.sendMessage(msg.key.remoteJid, { text: "🌍 Bot mis en mode *PUBLIC*" })
  }
}
