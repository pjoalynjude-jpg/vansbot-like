import makeWASocket, {
  useSingleFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys"
import Pino from "pino"
import fs from "fs"
import dotenv from "dotenv"

import menu from "./commands/menu.js"
import ping from "./commands/ping.js"
import setprefix from "./commands/setprefix.js"
import welcome from "./commands/welcome.js"
import goodbye from "./commands/goodbye.js"
import setprivate from "./commands/setprivate.js"
import setpublic from "./commands/setpublic.js"
import youtube from "./commands/youtube.js"
import tiktok from "./commands/tiktok.js"
import search from "./commands/search.js"
import ia from "./commands/ia.js"

dotenv.config()

const { state, saveCreds } = useSingleFileAuthState("./session.json")

let settings = JSON.parse(fs.readFileSync("./settings.json"))
let botState = {
  welcome: true,
  goodbye: true,
  mode: process.env.MODE || "private"
}

async function startBot() {
  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    browser: ["VansBotLike", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") console.log("✅ CONNECTED")
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      if (reason !== DisconnectReason.loggedOut) startBot()
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text

    if (!text?.startsWith(settings.prefix)) return

    if (
      botState.mode === "private" &&
      !from.includes(process.env.OWNER_NUMBER)
    ) return

    const args = text.slice(settings.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === "menu") menu(sock, from, settings.prefix)
    else if (command === "ping") ping(sock, from)
    else if (command === "setprefix") setprefix(sock, from, args, settings)
    else if (command === "welcome") welcome(sock, from, botState)
    else if (command === "goodbye") goodbye(sock, from, botState)
    else if (command === "setprivate") setprivate(sock, from, botState)
    else if (command === "setpublic") setpublic(sock, from, botState)
    else if (command === "youtube" || command === "yt") youtube(sock, from, args)
    else if (command === "tiktok") tiktok(sock, from, args)
    else if (command === "search") search(sock, from, args)
    else if (command === "ia") ia(sock, from, args)
  })
}

startBot()
