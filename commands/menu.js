export default async (sock, from, prefix) =>
  sock.sendMessage(from, {
    text: `🤖 MENU
${prefix}menu
${prefix}ping
${prefix}setprefix
${prefix}welcome
${prefix}goodbye
${prefix}setprivate
${prefix}setpublic
${prefix}youtube / yt
${prefix}tiktok
${prefix}search
${prefix}ia`
  })
