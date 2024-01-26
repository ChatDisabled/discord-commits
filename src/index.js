const core = require('@actions/core')
const github = require('@actions/github')
const webhook = require('../src/discord.js')

async function run() {
  const payload = github.context.payload
  const repository = payload.repository.name
  const commits = payload.commits
  const size = commits.length

  console.log(`Received payload.`)
  console.log(`Received ${commits.length}/${size} commits...`)
  console.log(`------------------------`)
  console.log(`Full payload: ${JSON.stringify(payload)}`)
  console.log(`------------------------`)

  if (commits.length === 0) {
    console.log(`No commits, skipping...`)
    return
  }
  if (payload.sender.type === 'Bot') {
    console.log(`Commit by bot, skipping...`)
    return
  }

  const id = core.getInput('id')
  const token = core.getInput('token')

  webhook
    .send(
      id,
      token,
      repository,
      payload.compare,
      commits,
      size,
      payload.pusher.name
    )
    .catch((err) => core.setFailed(err.message))
}

try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
