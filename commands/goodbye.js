const fs = require("fs")

module.exports = {
  name: "goodbye",
  execute(sock, msg, args) {
    const settings = JSON.parse(fs.readFileSync("./settings.json"))

    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "Utilise : !goodbye on / off"
      })
    }

    if (args[0] === "on") {
      settings.goodbye = true
      fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))
      return sock.sendMessage(msg.key.remoteJid, { text: "✅ Goodbye activé" })
    }

    if (args[0] === "off") {
      settings.goodbye = false
      fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ Goodbye désactivé" })
    }
  }
        }
