export default async (sock, from, prefix) => {
  const helpText = `🤖 *HELP MENU*

${prefix}menu
${prefix}help
${prefix}ping
${prefix}tagall
${prefix}setprefix
${prefix}welcome
${prefix}goodbye
${prefix}setprivate
${prefix}setpublic
${prefix}youtube
${prefix}tiktok
${prefix}search
${prefix}ia

⚡ VansBot Like`

  await sock.sendMessage(from, { text: helpText })
}
