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

const index = (req, res) => {
  const job = Object.assign(req.body, {
  })
  console.log(job)
  Job.find({url: job.URL})
    .then(jobs => res.json({
      jobs: jobs.map((e) =>
        e.toJSON())
    }))
}

module.exports = controller({
  create,
  index
})
