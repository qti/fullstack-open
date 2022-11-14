import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {
    const removePerson = ({ id, name }) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id)
            setPersons(persons.filter(person => person.id !== id))
        }
    }

    return (
        <>
            {persons
                .filter(person => person.name.includes(filter))
                .map(person =>
                    <p key={person.id}>
                        {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
                    </p>
                )}
        </>
    )
}

export default Persons
