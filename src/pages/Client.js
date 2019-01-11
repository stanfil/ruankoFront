import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { Route } from 'react-router-dom'
import NavBar from '../components/client/NavBar'
import Search from './Search'
import Login from './Login'
import Me from './Me'
import Home from './Home'
import Boardmore from './Boardmore'
import Listmore from './Listmore'
import Songmore from './Songmore'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class Client extends Component {
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
        {
          (window.location.hash.substr(0,5)!=="#/CMS")?<Route render={(props) => <NavBar handleLogout={()=>{this.handleLogout()}} isLogin={this.state.isLogin} handleSearch={(label)=>{this.handleSearch(label)}} {...props}/>} />:""
        }
        <Route exact path='/' render={(props)=><Home {...props}/>} />
        <Route path='/search' render={(props)=><Search label={this.state.label} {...props}/>} />
        <Route path='/login' render={(props)=><Login handleLogin={()=>{this.handleLogin()}} {...props}/>} />
        <Route path='/me' render={(props)=><Me {...props}/>} />
        <Route path='/boardmore' render={(props)=><Boardmore {...props}/>} />
        <Route path='/listmore' render={(props)=><Listmore {...props}/>} />
        <Route path='/songmore' render={(props)=><Songmore {...props}/>} />

        {

          // <Route path='/list/:id' render={(props)=><Listdetail {...props}/>}>
        }
      </div>
    )
  }
}

Client.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Client)
