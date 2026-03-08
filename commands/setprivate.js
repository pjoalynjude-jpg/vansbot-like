export default async (sock, from, state) => {
  state.mode = "private"
  sock.sendMessage(from, { text: "🔒 Mode privé activé" })
}
