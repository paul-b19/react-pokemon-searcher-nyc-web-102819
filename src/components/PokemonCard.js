import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }


  render() {

    let pic
    this.state.clicked ? 
      pic = this.props.pokemon.sprites.back : 
      pic = this.props.pokemon.sprites.front

    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={pic} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(statistic => statistic.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
