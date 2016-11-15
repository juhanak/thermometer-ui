import React from 'react'
import './Details.scss'
import { loadTemperaturesAsync } from '../modules/details'
import { connect } from 'react-redux'

export class Details extends React.Component {

  componentDidMount () {
    this.props.loadTemperaturesAsync(this.props.params.id)
  }

  render () {
    return (
      <div style={{ margin: '0 auto' }} >
        <ul className='dev-list'>
          { this.props.temperatures.map(measurement => <li> {measurement.temperature} </li>) }
        </ul>
        <button className='btn btn-default' onClick={() => this.props.loadTemperaturesAsync(this.props.params.id)} >
          Refresh temperatures
        </button>
      </div>
    )
  }
}

Details.propTypes = {
  temperatures     : React.PropTypes.array.isRequired,
  loadTemperaturesAsync : React.PropTypes.func.isRequired,
  params : React.PropTypes.array.isRequired
}

const mapDispatchToProps = {
  loadTemperaturesAsync
}

const mapStateToProps = (state) => {
  return ({
    temperatures : state.details ? state.details : []
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
