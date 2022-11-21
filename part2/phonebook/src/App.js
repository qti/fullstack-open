import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message, success }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    color: success ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [failureMessage, setFailureMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const fireSuccessMessage = () => {
    setSuccessMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  const fireFailureMessage = () => {
    setFailureMessage(
      `Information of ${newName} has already been removed from server`
    )
    setTimeout(() => {
      setFailureMessage('')
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const preExistingPerson = persons.find((person) => person.name === newName)
    if (preExistingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(preExistingPerson.id, { ...preExistingPerson, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== preExistingPerson.id ? person : returnedPerson))
            fireSuccessMessage()
          }).catch(error => {
            fireFailureMessage()
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          fireSuccessMessage()
        }).catch(error => {
          setFailureMessage(
            `${JSON.parse(error.request.responseText).error}`
          )
          setTimeout(() => {
            setFailureMessage('')
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={!!successMessage ? successMessage : failureMessage}
        success={!!successMessage}
      />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App
