import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {  } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../setting'
import Homelists from '../components/client/Homelists'
import Homesongs from '../components/client/Homesongs'
import Homeboards from '../components/client/Homeboards'
const styles = theme => ({

})

class Home extends Component {
  constructor(props){
    super(props)

  }

  render(){
    const { classes, history } = this.props

    return (
      <div className={classes.root}>
        <Homelists history={history} />
        <Homesongs history={history} />
        <Homeboards history={history} />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
