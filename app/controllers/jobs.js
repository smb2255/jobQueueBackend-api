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

const show = (req, res) => {
  res.json({
    job: req.job.toJSON()
    // item: req.item.toJSON({ virtuals: true, user: req.user })
  })
}

module.exports = controller({
  create
})
