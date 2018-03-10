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
  const job = Object.assign(req.body.item, {
    _owner: req.user._id
  })
  Job.create(job)
    .then(item =>
      res.status(201)
        .json({
          job: job.toJSON({ virtuals: true, user: req.user })
        }))
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
