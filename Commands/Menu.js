import config from "../config.js"

export default {
  name: "menu",
  description: "Afficher le menu du bot",
  execute(sock, msg) {
    const menu = `
🤖 *${config.botName}*
━━━━━━━━━━━━━━━
📌 *COMMANDES DE BASE*
${config.prefix}menu
${config.prefix}ping
${config.prefix}help [commande]

👥 *GROUPES*
${config.prefix}welcome
${config.prefix}goodbye
${config.prefix}tagall [message]

🌐 *MÉDIAS*
${config.prefix}youtube / yt [lien]
${config.prefix}tiktok [lien]
${config.prefix}search [recherche]

🤖 *INTELLIGENCE*
${config.prefix}ia [question]

⚙️ *PARAMÈTRES*
${config.prefix}setprefix [préfixe]
${config.prefix}setprivate
${config.prefix}setpublic
━━━━━━━━━━━━━━━
👑 Owner : ${config.owner}
🔐 Mode : ${config.mode.toUpperCase()}
`
    sock.sendMessage(msg.key.remoteJid, { text: menu })
  }
  }
