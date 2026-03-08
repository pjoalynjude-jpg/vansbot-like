export default async (sock, from, state) => {
  state.goodbye = !state.goodbye
  sock.sendMessage(from, { text: `👋 Goodbye: ${state.goodbye}` })
}
