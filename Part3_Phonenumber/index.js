const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    }, 
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-443-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

//3.1 puhelinluettelon backend step1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//3.2: puhelinluettelon backend step2
app.get('/info', (request, response) => {
    const date_ob = new Date();
    response.send('<h>Phonebook has info for </h>' + Object.keys(persons).length + '<h> people</h><p>' + date_ob)
})

//3.3: puhelinluettelon backend step3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
  })

//3.4: puhelinluettelon backend step4
app.delete('', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)

    response.status(204).end()
})
//3.5: puhelinluettelon backend step5
//3.6: puhelinluettelon backend step6
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}
app.post('/api/persons', (request, response) => {
    const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is required' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is required' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})