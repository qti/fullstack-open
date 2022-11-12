const Persons = ({ persons, filter }) => {
    return (
        <>
            {persons.filter((person) => person.name.includes(filter))
                .map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons
