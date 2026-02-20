export default {
  name: "goodbye",
  description: "Message d’au revoir automatique",
  async execute(sock) {
    sock.ev.on("group-participants.update", async update => {
      if (update.action === "remove") {
        await sock.sendMessage(update.id, {
          text: "👋 Un membre a quitté le groupe."
        })
      }
    })
  }
}
