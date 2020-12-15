import React, {useState} from 'react';



const Button = ({country}) =>{
 
  function handleClick() {
    var x = document.getElementById(country.name);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  const initStyle = {display: 'none'}
  return(
    <div>
      {country.name} 
      <button onClick={() => handleClick()}>show</button>
      <div id={country.name} style={initStyle} ><Display gefiltert={country}/></div>
    </div>
  )
}

const Display = ({gefiltert}) => {
  console.log(gefiltert)
  return(
    <div>
      <h1>{gefiltert.name}</h1>
      <p>{"capital " + gefiltert.capital}</p>
      <p>{"population " + gefiltert.population}</p>
      <h1>languages</h1>
      {gefiltert.languages.map(language => <li key={language.name}>{language.name}</li>)}
      <img src={gefiltert.flag} alt={gefiltert.name +" national flag"}></img>
    </div>
  )
}

const Filter = ({country,filter}) =>{
  const gefiltert = country.filter(person => person.name.toLowerCase().search(filter.toLowerCase()) !== -1)
  if(gefiltert.length >10){
    return(
      <div>
        {"zu lang"}
      </div>
    )
  }
  if(gefiltert.length <10 && gefiltert.length > 1){
    return(
      <div>
        {gefiltert.map(country => 
        <Button key={country.name} country={country}/>)}
        {"zwischen 1 und 10"}
      </div>
    )
  }
  if(gefiltert.length===1){
    console.log(gefiltert)
    return(
      <div>
        {gefiltert.map(gefiltert =>
        <Display key={gefiltert.name} gefiltert={gefiltert}/>)}
      </div>
    )
  }
  else{
    return(
      <div>
        {"kein ergebnis"}
      </div>
    )
  }

}

const App = ({country}) => {
  const [filter , setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  
  return (
    <div>
      find countries
      <input value={filter}
        onChange={handleFilterChange}
        />

      <Filter country={country} filter={filter}/>





      

      
      {/*country.map(country => <Display content={country.name}/>)*/}
    </div>
  )
}

export default App;
