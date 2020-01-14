import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state ={
    allPokemons: [],
    search: ''
  }

  componentDidMount() {
    this.getPokemons()
  }

  getPokemons = () => {
    fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ allPokemons: data })
      })
  }

  handleSearch = event => {
    // console.log(event.target.value)
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit = newPokemon => {
    // console.log('index submit', newPokemon)
    this.postPokemon(newPokemon)
  }

  postPokemon = newPokemon => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": `${newPokemon.name}`,
        "stats": [
          {
            "value": `${parseInt(newPokemon.hp)}`,
            "name": "hp"
          }
        ],
        "sprites": {
          "front": `${newPokemon.frontUrl}`,
          "back": `${newPokemon.backUrl}`
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log('new pokemon:', data)
      this.getPokemons()
    })
  }


  render() {

    let filteredPokemons
    if (this.state.search) {
      filteredPokemons = this.state.allPokemons.filter(pokemon => {
        return pokemon.name.startsWith(this.state.search.toLowerCase())
      })
    } else {
      filteredPokemons = this.state.allPokemons
    }

    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm onSubmit={this.handleSubmit}/>
        <br />
        <Search onChange={this.handleSearch} value={this.state.search}/>
        <br />
        <PokemonCollection pokemons={filteredPokemons}/>
      </Container>
    )
  }
}

export default PokemonPage
