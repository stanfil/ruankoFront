import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { Route } from 'react-router-dom'
import Profile from '../components/client/Profile'

const styles = theme => ({

})

class Me extends Component {
  constructor(props){
    super(props)

  }

  render(){
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Profile />
      </div>
    )
  }
}

Me.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Me)
