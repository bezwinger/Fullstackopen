import React, { useState ,useEffect } from 'react'
import Display from './components/Display'
import personService from './services/Persons'



const ErrorMessage = ({error, color}) =>{

    const errorStyle ={
      
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

    const successStyle ={
    
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(error === null){
    return(<div></div>)
  }
  else{
    if(color === 0){
      return(<div style={errorStyle}>{error}</div>)
  }
    else{
      return(<div style={successStyle}>{error}</div>)
  }
}
} 

const App = () => {
  
  const [persons, setPersons] = useState([])

  useEffect(() => {
      console.log("nein",error)
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ error, setError] = useState(null)
  const [ color, setColor] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personsObjekt = {
      name: newName,
      number: newNumber
    }
    
    
    var vorhanden = persons.filter(person => person.name === newName)
    console.log(vorhanden)
    if(vorhanden.length)
    {  
      if(window.confirm(newName +" ist bereits vorhanden")){
        personService.update(vorhanden[0].id, personsObjekt)
        setError(`Updated ${newName}`)
        setColor(1)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
    else
    {
      personService.create(personsObjekt).then(response => setPersons(persons.concat(response.data)))
    
    setError(`Created ${newName}`)
        setColor(1)
        setTimeout(() => {
          setError(null)
        }, 5000)
    setNewName('')
    setNewNumber('')
    }
  }

  const destroyPerson = (id) => {
    console.log(id)
    const name = persons.filter(person => person.id === id)[0].name
    console.log(name)
    personService
          .destroy(id)
          .then(() =>{
            setPersons(persons.filter(person => person.id !== id))
            setError(`Destroyed ${name}`)
            setColor(1)
            setTimeout(() => {
              setError(null)
            }, 5000)})
          .catch(error =>{
            setError(`${name}' was already removed from server`)
            setColor(0)
            setTimeout(() => {
            setError(null)
            }, 5000)
                })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <ErrorMessage error={error} color={color}/>
      </div>
      <div>

        Filter:
        <input value={filter}
        onChange={handleFilterChange}
        />
      </div>
      <form onSubmit = {addPerson}>
        <div>
          
          Name: 
          <input value={newName}
          onChange={handleNameChange} 
          />
          </div>
          <div>
          Nummer:
          <input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers:</h2>
      
      {persons.filter(person => person.name.toLowerCase().search(filter.toLowerCase()) !== -1).map(
        person => <Display key = {person.id} id={person.id} name={person.name} number={person.number} deleteFunction={destroyPerson}/>
      )}
      
      ...
    </div>
  )
}

export default App