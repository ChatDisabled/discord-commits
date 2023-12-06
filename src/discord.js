const { MessageEmbed, WebhookClient } = require('discord.js')
const MAX_MESSAGE_LENGTH = 72

module.exports.send = (id, token, repo, branch, url, commits, size, threadId) =>
  new Promise((resolve, reject) => {
    let client
    const username = repo.replace('discord', '******')
    console.log('Preparing Webhook...')
    console.log(username)
    console.log(repo)
    try {
      client = new WebhookClient({
        id: id,
        token: token,
      })

      if (threadId) {
        if (isNaN(threadId)) {
          throw new Error('threadId is not a number')
        }
        console.log('Found thread ID')
        client
          .send({
            username: username,
            embeds: [createEmbed(repo, branch, url, commits, size)],
            threadId: threadId,
          })
          .then(() => {
            console.log('Successfully sent the message!')
            resolve()
          }, reject)
      } else {
        client
          .send({
            username: username,
            embeds: [createEmbed(repo, branch, url, commits, size)],
          })
          .then(() => {
            console.log('Successfully sent the message!')
            resolve()
          }, reject)
      }
    } catch (error) {
      console.log('Error creating Webhook')
      reject(error.message)
      return
    }
  })

function createEmbed(repo, branch, url, commits, size) {
  console.log('Constructing Embed...')
  console.log('Commits :')
  console.log(commits)
  if (!commits) {
    console.log('No commits, skipping...')
    return
  }
  const latest = commits[0]
  return new MessageEmbed()
    .setColor(0xf1e542)
    .setAuthor({
      name: `⚡ ${latest.author.username} pushed ${size} commit${
        size === 1 ? '' : 's'
      }`,
      iconURL: `https://github.com/${latest.author.username}.png?size=32`,
      url: url,
    })
    .setDescription(`${getChangeLog(commits, size)}`)
    .setTimestamp(Date.parse(latest.timestamp))
}

function getChangeLog(commits, size) {
  let changelog = ''
  for (const i in commits) {
    if (i > 7) {
      changelog += `+ ${size - i} more...\n`
      break
    }

    const commit = commits[i]
    const sha = commit.id.substring(0, 6)
    const message =
      commit.message.length > MAX_MESSAGE_LENGTH
        ? commit.message.substring(0, MAX_MESSAGE_LENGTH) + '...'
        : commit.message
    changelog += `[\`${sha}\`](${commit.url}) — ${message} ([\`${commit.author.username}\`](https://github.com/${commit.author.username}))\n`
  }

  return changelog
}
