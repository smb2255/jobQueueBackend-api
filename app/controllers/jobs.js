'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Job = models.jobs

const create = (req, res, next) => {
  const job = Object.assign(req.body.job, {
  })
  Job.create(job)
    .then(job =>
      res.status(201)
        .json({
          job: job.toJSON()
          // ({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

module.exports = controller({
  create
})
