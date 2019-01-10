import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { Route } from 'react-router-dom'
import NavBar from '../components/client/NavBar'
import Search from './Search'
import Login from './Login'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      label: "",
      isLogin: false,
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSearch = (label)=>{
    this.setState({
      label,
    })
  }

  handleLogin() {
    this.setState({
      isLogin: true
    })
  }

  handleLogout() {
    this.setState({
      isLogin: false
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className = { classes.root }>
        <Route render={(props) => <NavBar handleLogout={()=>{this.handleLogout()}} isLogin={this.state.isLogin} handleSearch={(label)=>{this.handleSearch(label)}} {...props}/>} />
        <Route path='/search' render={(props)=><Search label={this.state.label} {...props}/>} />
        <Route path='/login' render={(props)=><Login handleLogin={()=>{this.handleLogin()}} {...props}/>} />
        <Route path='/me' render={(props)=><Me {...props}/>} />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
