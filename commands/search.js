export default async (sock, from, args) =>
  sock.sendMessage(from, { text: `🔍 ${args.join(" ")}` })
