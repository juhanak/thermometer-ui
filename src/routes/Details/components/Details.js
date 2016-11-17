import React from 'react'
import './Details.scss'
import { loadTemperaturesAsync } from '../modules/details'
import { connect } from 'react-redux'
import { LineChart } from 'react-d3-components'
import { createSelector } from 'reselect'

const xAccessor = (element) => { return element ? element.updatetime : 0 }
const yAccessor = (element) => { return element ? element.temperature : 0 }
const valuesAccessor = (element) => { return element ? element.tenLast : 0 }

export class Details extends React.Component {

  componentDidMount () {
    this.props.loadTemperaturesAsync(this.props.params.id)
  }

  render () {
    return (
      <div style={{ margin: '0 auto' }} >

        <button className='btn btn-default' onClick={() => this.props.loadTemperaturesAsync(this.props.params.id)} >
          Refresh temperatures
        </button>

        <LineChart
          data={this.props}
          width={400}
          height={400}
          margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          xAxis={{ innerTickSize: 100, label: 'x-label' }}
          yAxis={{ label: 'y-label' }}
          x={xAccessor}
          y={yAccessor}
          values={valuesAccessor}
        />
        <ul className='dev-list'>
          { this.props.temperatures.map(measurement => <li> {measurement.temperature} </li>) }
        </ul>

      </div>
    )
  }
}

const getTemperatures = (state) => {
  return state.details
}
const tenLast = createSelector(getTemperatures, (temperatures) => { return temperatures.slice(-10) })

Details.propTypes = {
  temperatures : React.PropTypes.array.isRequired,
  loadTemperaturesAsync : React.PropTypes.func.isRequired,
  params : React.PropTypes.array.isRequired,
  tenLast :React.PropTypes.array.isRequired
}

const mapDispatchToProps = {
  loadTemperaturesAsync
}

const mapStateToProps = (state) => {
  return ({
    temperatures : state.details ? state.details : [{ updatetime: 0, temperature:0 }],
    tenLast : state.details ? tenLast(state) : [{ updatetime: 0, temperature:0 }]
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
