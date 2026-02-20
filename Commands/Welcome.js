export default {
  name: "welcome",
  description: "Message de bienvenue automatique",
  async execute(sock) {
    sock.ev.on("group-participants.update", async update => {
      if (update.action === "add") {
        await sock.sendMessage(update.id, {
          text: "👋 Bienvenue dans le groupe !"
        })
      }
    })
  }
}
