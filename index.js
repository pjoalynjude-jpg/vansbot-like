// index.js
const fs = require("fs")
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const dotenv = require("dotenv")
dotenv.config()
const qrcode = require("qrcode-terminal")

// Fichier de settings
const settingsFile = "./settings.json"

// Loader de commandes
const commands = {}
fs.readdirSync("./commands").forEach(file => {
  const cmd = require(`./commands/${file}`)
  commands[cmd.name] = cmd
  if (cmd.alias) {
    cmd.alias.forEach(a => commands[a] = cmd)
  }
})

// Démarrage du bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", update => {
    if (update.qr) qrcode.generate(update.qr, { small: true })
    if (update.connection === "open") console.log("🤖 Bot WhatsApp prêt !")
  })

  // Listener messages (commandes)
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || !msg.message.conversation) return

    // Lire settings pour chaque message
    const currentSettings = JSON.parse(fs.readFileSync(settingsFile))
    const prefix = currentSettings.prefix
    const owner = process.env.OWNER_NUMBER + "@s.whatsapp.net"

    if (!msg.message.conversation.startsWith(prefix)) return

    const args = msg.message.conversation.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    // Mode privé : bloquer tout sauf OWNER
    if (currentSettings.mode === "private" && msg.key.participant !== owner) return

    if (commands[command]) {
      commands[command].execute(sock, msg, args)
    }
  })

  // Listener groupes (welcome / goodbye)
  sock.ev.on("group-participants.update", async update => {
    const currentSettings = JSON.parse(fs.readFileSync(settingsFile))
    const jid = update.id

    // Welcome
    if (update.action === "add" && currentSettings.welcome) {
      for (const user of update.participants) {
        await sock.sendMessage(jid, {
          text: `👋 Bienvenue @${user.split("@")[0]} !`,
          mentions: [user]
        })
      }
    }

    // Goodbye
    if (update.action === "remove" && currentSettings.goodbye) {
      for (const user of update.participants) {
        await sock.sendMessage(jid, {
          text: `👋 Au revoir @${user.split("@")[0]} 😢`,
          mentions: [user]
        })
      }
    }
  })
}

// Lancer le bot
startBot()
