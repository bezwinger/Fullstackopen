require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()
const Person = require('./models/person')

morgan.token('type', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :type'))
app.use(express.static('build'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(`Phonebook has info for ${persons.length} people ${new Date()}`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => { res.json(updatedPerson) })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      res.json(savedAndFormattedPerson)
    })
    .catch((error) => {
      res.status(400).json({ error: 'name missing' })
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const { PORT } = process.env
// const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => { res.status(404).send({ error: 'unknown endpoint' }) }
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') { return res.status(400).send({ error: 'malformatted id' }) }
  if (error.name === 'ValidationError') { return res.status(400).json({ error: error.message }) }
  next(error)
}

app.use(errorHandler)
