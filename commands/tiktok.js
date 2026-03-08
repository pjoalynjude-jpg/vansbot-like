export default async (sock, from, args) =>
  sock.sendMessage(from, { text: `🎵 ${args[0]}` })
