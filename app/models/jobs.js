'use strict'

const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
})
const Job = mongoose.model('Job', jobSchema)

module.exports = Job
