export default async (sock, from, state) => {
  state.mode = "public"
  sock.sendMessage(from, { text: "🌍 Mode public activé" })
}
