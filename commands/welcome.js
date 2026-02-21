const fs = require("fs")

module.exports = {
  name: "welcome",
  execute(sock, msg, args) {
    const settings = JSON.parse(fs.readFileSync("./settings.json"))

    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "Utilise : !welcome on / off"
      })
    }

    if (args[0] === "on") {
      settings.welcome = true
      fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))
      return sock.sendMessage(msg.key.remoteJid, { text: "✅ Welcome activé" })
    }

    if (args[0] === "off") {
      settings.welcome = false
      fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ Welcome désactivé" })
    }
  }
        }
