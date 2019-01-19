import React, { Component } from 'react'
import SignIn from '../components/cms/SignIn'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'

const styles = theme => ({
  bg_img: {
    position: 'fixed',
    width: '100%',
    height: 'auto',
    top: '0',
  },
  main: {
    position: 'fixed',
    top: '64px',
    right: 0,
    left: 0,
    paddingTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class AdminSignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginfailed: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (username, password) => {
    let { history } = this.props
    const payload = {
      username,
      password
    }
    axios.post(`${Server}/admin/login`, payload)
      .then( res => {
        let { message, user } = res.data
        sessionStorage.setItem('admin', user)
        history.push('/CMS')
        console.log(message)
      }, err => {
        this.setState({
          loginfailed: true
        })
        console.log(err)
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props
    return (
      <main className={ classes.main }>
        <img className={ classes.bg_img } src={require('../img/bg_like.jpg')} alt=''/>
        <SignIn loginfailed={this.state.loginfailed} handleSubmit={(username, password) => { this.handleSubmit(username, password)}} />
      </main>
    )
  }
}

AdminSignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(AdminSignIn)
