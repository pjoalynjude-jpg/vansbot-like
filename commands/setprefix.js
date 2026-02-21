const fs = require("fs")

module.exports = {
  name: "setprefix",
  execute(sock, msg, args) {
    if (!args[0]) return sock.sendMessage(msg.key.remoteJid, { text: "Utilise : !setprefix [nouveau préfixe]" })

    const settings = JSON.parse(fs.readFileSync("./settings.json"))
    settings.prefix = args[0]
    fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))

    sock.sendMessage(msg.key.remoteJid, { text: `✅ Préfixe changé en : *${args[0]}*` })
  }
}
