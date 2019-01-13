import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
// import axios from 'axios'
// import { Server } from '../setting'
import { Route } from 'react-router-dom'
import NavBar from '../components/client/NavBar'
import Search from './Search'
import Login from './Login'
import Me from './Me'
import Home from './Home'
import Boardmore from './Boardmore'
import Listmore from './Listmore'
import Songmore from './Songmore'
import List from './List'
import Song from './Song'
import Player from './Player'
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
      height: "100vh"
  }
})

class Client extends Component {
  constructor(props){
    super(props)
    this.state = {
        label: "",
        isLogin: false,
        playlist: [],
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
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

  updatePlaylist(songs){
      const updatedlist = songs.concat(this.state.playlist)
      this.setState({playlist: updatedlist})
  }

  render() {
    const { classes } = this.props
    return (
      <div className = { classes.root }>
        {
          (window.location.hash.substr(0,5)!=="#/CMS")?<Route render={(props) => <NavBar handleLogout={()=>{this.handleLogout()}} isLogin={this.state.isLogin} handleSearch={(label)=>{this.handleSearch(label)}} {...props}/>} />:""
        }
        <Route exact path='/' render={(props)=><Home updatePlaylist={(songs)=>this.updatePlaylist(songs)} {...props}/>} />
        <Route path='/search' render={(props)=><Search label={this.state.label} {...props}/>} />
        <Route path='/login' render={(props)=><Login handleLogin={()=>{this.handleLogin()}} {...props}/>} />
        <Route path='/me' render={(props)=><Me {...props}/>} />
        <Route path='/boardmore' render={(props)=><Boardmore {...props}/>} />
        <Route path='/listmore' render={(props)=><Listmore {...props}/>} />
        <Route path='/songmore' render={(props)=><Songmore {...props}/>} />
        <Route path='/list/:_id' render={(props)=><List {...props}/>} />
        <Route path='/song/:mid' render={(props)=><Song {...props}/>} />
        <Route path='/player' render={(props)=><Player playlist={this.state.playlist} {...props}/>} />

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
