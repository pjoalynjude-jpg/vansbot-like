import fs from "fs"

export default {
  name: "help",
  description: "Aide sur une commande",
  async execute(sock, msg, args) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❓ Utilisation : help [commande]"
      })
    }

    const file = `./commands/${args[0]}.js`
    if (!fs.existsSync(file)) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Commande introuvable"
      })
    }

    const cmd = (await import(file)).default
    sock.sendMessage(msg.key.remoteJid, {
      text: `
📖 *AIDE*
Commande : ${cmd.name}
Description : ${cmd.description}
`
    })
  }
}
