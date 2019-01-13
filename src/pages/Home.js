import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {  } from '@material-ui/core'
import Homelists from '../components/client/Homelists'
import Homesongs from '../components/client/Homesongs'
import Homeboards from '../components/client/Homeboards'
const styles = theme => ({

})

class Home extends Component {
  constructor(props){
    super(props)
    this.updatePlaylist = this.updatePlaylist.bind(this)
  }

  updatePlaylist(songs){
      this.props.updatePlaylist(songs)
  }

  render(){
    const { classes, history } = this.props

    return (
      <div className={classes.root}>
        <Homelists updatePlaylist={(songs)=>{this.updatePlaylist(songs)}} history={history} />
        <Homesongs updatePlaylist={(songs)=>{this.updatePlaylist(songs)}} history={history} />
        <Homeboards updatePlaylist={(songs)=>{this.updatePlaylist(songs)}} history={history} />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
