'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Job = models.jobs

const create = (req, res, next) => {
  const job = Object.assign(req.body, {
  })
  console.log(job)
  Job.create({url: job.URL})
    .then(job =>
      res.status(201)
        .json({
          job: job.toJSON()
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
