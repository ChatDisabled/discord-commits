const core = require('@actions/core')
const github = require('@actions/github')
const webhook = require('../src/discord.js')

async function run() {
  const payload = github.context.payload
  const repository = payload.repository.name
  const commits = payload.commits
  const size = commits.length
  console.log(JSON.stringify(payload.pusher))
  console.log(`Received payload.`)

  console.log(`Received ${commits.length}/${size} commits...`)

  if (commits.length === 0) {
    console.log(`No commits, skipping...`)
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
    )
    .catch((err) => core.setFailed(err.message))
}

try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
