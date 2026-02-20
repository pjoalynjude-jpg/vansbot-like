import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config()

// Charger toutes les commandes
const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
  const cmd = await import(path.join('./commands', file))
  commands[cmd.default.name] = cmd.default
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on("creds.update", saveCreds)
  console.log("🤖 Bot WhatsApp prêt !")

  // Écoute des messages
  sock.ev.on("messages.upsert", async m => {
    const msg = m.messages[0]
    if (!msg.message?.conversation) return

    const text = msg.message.conversation
    const prefix = '!'
    if (!text.startsWith(prefix)) return

    const args = text.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (commands[command]) {
      commands[command].execute(sock, msg, args)
    }
  })
}

startBot()
