import config from "../config.js"
import fs from "fs"

export default {
  name: "setprefix",
  description: "Changer le préfixe du bot",
  execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Utilisation : setprefix [nouveau préfixe]"
      })
    }

    config.prefix = args[0]

    fs.writeFileSync(
      "./config.js",
      `export default ${JSON.stringify(config, null, 2)}`
    )

    sock.sendMessage(msg.key.remoteJid, {
      text: `✅ Préfixe changé en : ${args[0]}`
    })
  }
        }
