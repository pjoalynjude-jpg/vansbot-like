import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"
import fs from "fs"
import config from "./config.js"

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("auth")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ qr }) => {
    if (qr) qrcode.generate(qr, { small: true })
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    if (!text.startsWith(config.prefix)) return

    const args = text.slice(config.prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    const commandPath = `./commands/${commandName}.js`
    if (!fs.existsSync(commandPath)) return

    const command = (await import(commandPath)).default
    command.execute(sock, msg, args)
  })
  } // MODE PRIVÉ
if (config.mode === "private") {
  const sender = msg.key.participant || msg.key.remoteJid
  if (!sender.includes(config.owner)) return
    }

startBot()
