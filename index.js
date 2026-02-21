const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const fs = require("fs")
require("dotenv").config()

// 🔹 Charger settings + préfixe
let settings = { prefix: "!" }
if (fs.existsSync("settings.json")) {
  settings = JSON.parse(fs.readFileSync("settings.json"))
}

// 🔹 Charger état session WhatsApp
const { state, saveCreds } = useSingleFileAuthState("./session.json")

// 🔹 Variables mode privé/public et welcome/goodbye
let botMode = process.env.MODE || "private" // private/public
let welcomeOn = true
let goodbyeOn = true

// 🔹 Import des commandes (CommonJS)
const pingCommand = require("./commands/ping.js")
const tagallCommand = require("./commands/tagall.js")
// ... ajoute tes autres commandes ici

// 🔹 Fonction principale
async function startBot() {
  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    browser: ["VansBotLike", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "open") console.log("✅ CONNECTED TO WHATSAPP")

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      console.log("❌ Connection closed :", reason)
      if (reason !== DisconnectReason.loggedOut) startBot()
    }
  })

  // 🔹 Listener messages
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    const isGroup = from.endsWith("@g.us")

    if (!text) return
    const args = text.trim().split(/ +/)
    const command = args[0].slice(settings.prefix.length).toLowerCase()

    // 🔹 Commandes avec préfixe
    if (text.startsWith(settings.prefix)) {

      // Menu
      if (command === "menu") {
        sock.sendMessage(from, { text:
`🤖 *Bot Menu*
${settings.prefix}menu - Affiche ce menu
${settings.prefix}ping - Pong
${settings.prefix}help [commande] - Aide
${settings.prefix}tagall [msg] - Mentionne tous les membres
${settings.prefix}setprefix [prefix] - Change le préfixe
${settings.prefix}welcome - ON/OFF
${settings.prefix}goodbye - ON/OFF
${settings.prefix}youtube [lien] / yt
${settings.prefix}tiktok [lien]
${settings.prefix}search [texte]
${settings.prefix}ia [texte]
${settings.prefix}setprivate
${settings.prefix}setpublic`
        })
      }

      // Ping
      else if (command === "ping") await pingCommand(sock, from, args)

      // Tagall
      else if (command === "tagall" && isGroup) await tagallCommand(sock, from, args, m)

      // Setprefix
      else if (command === "setprefix" && args[1]) {
        settings.prefix = args[1]
        fs.writeFileSync("settings.json", JSON.stringify(settings, null, 2))
        sock.sendMessage(from, { text: `✅ Préfixe changé en: ${settings.prefix}` })
      }

      // Help
      else if (command === "help") {
        const helpCmd = args[1] || "menu"
        sock.sendMessage(from, { text: `🆘 Aide pour: ${helpCmd}` })
      }

      // Welcome ON/OFF
      else if (command === "welcome") {
        welcomeOn = !welcomeOn
        sock.sendMessage(from, { text: `✅ Welcome est maintenant: ${welcomeOn ? "ON" : "OFF"}` })
      }

      // Goodbye ON/OFF
      else if (command === "goodbye") {
        goodbyeOn = !goodbyeOn
        sock.sendMessage(from, { text: `✅ Goodbye est maintenant: ${goodbyeOn ? "ON" : "OFF"}` })
      }

      // Set mode privé/public
      else if (command === "setprivate") {
        botMode = "private"
        sock.sendMessage(from, { text: "🔒 Mode privé activé" })
      }
      else if (command === "setpublic") {
        botMode = "public"
        sock.sendMessage(from, { text: "🌐 Mode public activé" })
      }

      // Youtube / yt
      else if (["youtube","yt"].includes(command) && args[1]) {
        sock.sendMessage(from, { text: `🔗 Youtube: ${args[1]}` })
      }

      // TikTok
      else if (command === "tiktok" && args[1]) {
        sock.sendMessage(from, { text: `🔗 TikTok: ${args[1]}` })
      }

      // Search
      else if (command === "search" && args[1]) {
        sock.sendMessage(from, { text: `🔍 Recherche: ${args.slice(1).join(" ")}` })
      }

      // IA
      else if (command === "ia" && args[1]) {
        sock.sendMessage(from, { text: `🤖 IA réponse pour: ${args.slice(1).join(" ")}` })
      }
    }
  })

  // 🔹 Listener join/leave groupe
  sock.ev.on("groups.update", (groups) => {
    groups.forEach(g => {
      if (welcomeOn) console.log(`👋 Welcome activé pour groupe: ${g.subject}`)
      if (goodbyeOn) console.log(`👋 Goodbye activé pour groupe: ${g.subject}`)
    })
  })
}

startBot()
