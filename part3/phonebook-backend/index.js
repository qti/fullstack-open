const express = require('express');

const morgan = require('morgan');

const app = express();
const Person = require('./models/person');
require('dotenv').config();

app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => req.headers.body || '{}');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/info', (request, response) => {
  Person.count({}).then((personCount) => {
    response.send(`
            <p>Phonebook has info for ${personCount} people</p>
            <p>${new Date()}</p>
        `);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  if (!body) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: `${!body.name ? 'number' : 'name'} is missing`,
    });
  }

  if (Person.find({}).find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} is already in the phonebook`,
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  }).catch((error) => next(error));
  morgan.token('body', () => JSON.stringify(request.body));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
