import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    background: `url(require('../../img/bg_profile.jpg')) no-repeat`
    "background-width"
  }
})

const Profile = (props){
  const { classes } = props
  return (
    <div className={clsses.root}>

    </div>
  )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
