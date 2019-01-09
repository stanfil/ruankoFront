import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'

const styles = theme => ({
    root: {

    }
})

class Home extends Component {
  constructor(props){
    super(props)

  }

  render() {
    const { classes } = this.props
    return (
      <div className = { classes.root }>

      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
