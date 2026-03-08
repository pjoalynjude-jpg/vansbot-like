import makeWASocket, {
  useSingleFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys"

import Pino from "pino"
import fs from "fs"
import dotenv from "dotenv"

import menu from "./commands/menu.js"
import help from "./commands/help.js"
import ping from "./commands/ping.js"
import tagall from "./commands/tagall.js"
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
    browser: ["VansBot", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

    if (connection === "open") {
      console.log("✅ BOT CONNECTÉ")
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode

      if (reason !== DisconnectReason.loggedOut) {
        startBot()
      }
    }

  })

  sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    if (!text.startsWith(settings.prefix)) return

    if (
      botState.mode === "private" &&
      !from.includes(process.env.OWNER_NUMBER)
    ) return

    const args = text.slice(settings.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    try {

      if (command === "menu") {
        await menu(sock, from, settings.prefix)
      }

      else if (command === "help") {
        await help(sock, from, settings.prefix)
      }

      else if (command === "ping") {
        await ping(sock, from)
      }

      else if (command === "tagall") {
        await tagall(sock, from)
      }

      else if (command === "setprefix") {
        await setprefix(sock, from, args, settings)
      }

      else if (command === "welcome") {
        await welcome(sock, from, botState)
      }

      else if (command === "goodbye") {
        await goodbye(sock, from, botState)
      }

      else if (command === "setprivate") {
        await setprivate(sock, from, botState)
      }

      else if (command === "setpublic") {
        await setpublic(sock, from, botState)
      }

      else if (command === "youtube" || command === "yt") {
        await youtube(sock, from, args)
      }

      else if (command === "tiktok") {
        await tiktok(sock, from, args)
      }

      else if (command === "search") {
        await search(sock, from, args)
      }

      else if (command === "ia") {
        await ia(sock, from, args)
      }

    } catch (err) {
      console.log(err)
    }

  })
}

startBot()
