'use strict'

const mongoose = require('mongoose'); require('mongoose-type-url')

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: mongoose.SchemaTypes.Url,
    required: true
  }
})
const Job = mongoose.model('Job', jobSchema)

module.exports = Job
