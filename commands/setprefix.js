import fs from "fs"

export default async (sock, from, args, settings) => {
  if (!args[0]) return
  settings.prefix = args[0]
  fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 2))
  sock.sendMessage(from, { text: `✅ Prefix: ${settings.prefix}` })
}
