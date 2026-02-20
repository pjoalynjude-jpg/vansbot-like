import config from "../config.js"

export default {
  name: "menu",
  description: "Afficher le menu du bot",
  execute(sock, msg) {
    sock.sendMessage(msg.key.remoteJid, {
      text: `
🤖 *${config.botName}*
━━━━━━━━━━━━━━
${config.prefix}menu
${config.prefix}ping
${config.prefix}help [commande]
${config.prefix}tagall [message]
${config.prefix}setprefix [préfixe]
━━━━━━━━━━━━━━
Owner : ${config.owner}
`
    })
  }
}
