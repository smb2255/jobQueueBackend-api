'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Job = models.job

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Job.find()
    .then(jobs => res.json({
      jobs: jobs.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    job: req.job.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  console.log('in create')
  const job = Object.assign(req.body.job, {
    html: null
  })
  Job.create(job)
    .then(job => (how do i make a GET request here to get the job.url?)
      job.status('pending')
      .then(html => job.html = html)
      job.status('complete')
      .then(job.update())
        .json({
          job: job.toJSON
          // ({ virtuals: true, user: req.user })
        }))
    // .catch(next)
}
const update = (req, res, next) => {
  delete req.body.item

  req.item.update(req.body.item)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.job.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show', 'create'] },
  { method: setModel(Job), only: ['show'] },
  { method: setModel(Job, { forUser: true }), only: ['destroy'] }
] })
