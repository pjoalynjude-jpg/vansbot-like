export default async (sock, from, msg) => {
  if (!from.endsWith("@g.us")) {
    return sock.sendMessage(from, {
      text: "❌ Cette commande fonctionne seulement dans les groupes"
    })
  }

  const metadata = await sock.groupMetadata(from)
  const participants = metadata.participants

  let text = "📢 *TAG ALL*\n\n"
  let mentions = []

  for (let p of participants) {
    text += `@${p.id.split("@")[0]}\n`
    mentions.push(p.id)
  }

  await sock.sendMessage(from, {
    text,
    mentions
  })
      }
