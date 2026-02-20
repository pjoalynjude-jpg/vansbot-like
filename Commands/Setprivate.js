import config from "../config.js"
import fs from "fs"

export default {
  name: "setprivate",
  description: "Met le bot en mode privé",
  execute(sock, msg) {
    config.mode = "private"

    fs.writeFileSync(
      "./config.js",
      `export default ${JSON.stringify(config, null, 2)}`
    )

    sock.sendMessage(msg.key.remoteJid, {
      text: "🔒 Bot en mode PRIVÉ"
    })
  }
}
