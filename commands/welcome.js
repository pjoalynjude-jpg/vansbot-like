export default async (sock, from, state) => {
  state.welcome = !state.welcome
  sock.sendMessage(from, { text: `👋 Welcome: ${state.welcome}` })
}
