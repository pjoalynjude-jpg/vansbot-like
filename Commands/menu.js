const fs = require("fs")

module.exports = {
  name: "menu",
  execute(sock, msg) {
    const settings = JSON.parse(fs.readFileSync("./settings.json"))
    const p = settings.prefix

    const menu = `
🤖 *VANSBOT-LIKE MENU*

📌 *Général*
• ${p}menu
• ${p}ping
• ${p}help [commande]
• ${p}ai [message]
• ${p}search [texte]

📥 *Médias*
• ${p}tiktok [lien]
• ${p}youtube / ${p}yt [lien]

👥 *Groupe*
• ${p}tagall [message]
• ${p}welcome on/off
• ${p}goodbye on/off
• ${p}setprivate
• ${p}setpublic
• ${p}setprefix [nouveau préfixe]

⚙️ Bot WhatsApp by Joalyn
`
    sock.sendMessage(msg.key.remoteJid, { text: menu })
  }
}   }
