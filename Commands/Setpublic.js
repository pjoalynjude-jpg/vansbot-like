import config from "../config.js"
import fs from "fs"

export default {
  name: "setpublic",
  description: "Met le bot en mode public",
  execute(sock, msg) {
    config.mode = "public"

    fs.writeFileSync(
      "./config.js",
      `export default ${JSON.stringify(config, null, 2)}`
    )

    sock.sendMessage(msg.key.remoteJid, {
      text: "🔓 Bot en mode PUBLIC"
    })
  }
}
