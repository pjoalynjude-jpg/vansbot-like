const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
require("dotenv").config()
const qrcode = require("qrcode-terminal")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)
  
  sock.ev.on("connection.update", update => {
    if (update.qr) qrcode.generate(update.qr, { small: true })
    if (update.connection === "open") {
      console.log("🤖 Bot WhatsApp prêt !")
    }
  })
}

startBot()
