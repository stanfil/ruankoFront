import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    "background-image": `url(${require('../../img/bg_profile.jpg')})`,
    "background-position": 'bottom center',
    height: 280,
    width: window.outerWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px'
  },
  avator: {
    borderRadius: '50%',
    width: 110,
    height: 110
  },
  nickname: {
    marginTop: 30,
    color: 'white',
    "font-size": 30
  }
})

const Profile = (props) => {
  const { classes, nickname } = props
  return (
    <div className={classes.root}>
      <img alt='' src={require('../../img/avator.jpg')} className={classes.avator}/>
      <span className={classes.nickname}>{nickname}</span>
    </div>
  )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
