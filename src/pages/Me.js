import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../setting'
import { Route } from 'react-router-dom'
import Profile from '../components/client/Profile'
import Likelist from '../components/client/Likelist'
import Createlists from '../components/client/Createlists'
import Collectlists from '../components/client/Collectlists'
import Changeinfo from "../components/client/Changeinfo"

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: window.outerWidth,
  },
  menu: {
    position: "relative",
    top: -40,
    width: '70%',

  },
  navbtn: {
    color: "white",
    height: 30,
    marginRight: 15,
  },
  grow: {
    flexGrow: 1
  },
  navwrapper: {
    display: "flex",

  }

})

class Me extends Component {
  constructor(props){
    super(props)
    this.state={
      likelist:[],
      collectlists:[],
      createlists:[],
      nickname: sessionStorage.getItem('nickname')
    }
    this.likelist = this.likelist.bind(this)
    this.collectlists = this.collectlists.bind(this)
    this.createlists = this.createlists.bind(this)
    this.changeinfo = this.changeinfo.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  componentDidMount(){
    this.likelist()
  }

  likelist() {
    let history = this.props.history
    if(window.location.hash!=='#/me'){
      history.push('/me')
    }
    let email = sessionStorage.getItem('email')
    axios.get(`${Server}/list/likelist?email=${email}`)
      .then(res=>{
        this.setState({
          likelist: res.data
        })
        // console.log(res.data)
      })
  }

  collectlists() {
    let history = this.props.history
    if(window.location.hash!=='#/me/collectlists'){
      history.push('/me/collectlists')
    }
    let email = sessionStorage.getItem('email')
    axios.get(`${Server}/list/collectlists?email=${email}`)
      .then(res=>{
        this.setState({
          collectlists: res.data
        })
        // console.log(res.data)
      })
  }

  createlists() {
    let history = this.props.history
    if(window.location.hash!=='#/me/createlists'){
      history.push('/me/createlists')
    }
    let email = sessionStorage.getItem('email')
    axios.get(`${Server}/list/createlists?email=${email}`)
      .then(res=>{
        this.setState({
          createlists: res.data
        })
        // console.log(res.data)
      })
  }

  changeinfo() {
    let history = this.props.history
    if(window.location.hash!=='#/me/changeinfo'){
      history.push('/me/changeinfo')
    }
  }

  updateProfile(nickname){
    this.setState({
      nickname
    })
  }

  render(){
    const {classes} = this.props
    const user = {
      email: sessionStorage.getItem('email'),
      nickname: sessionStorage.getItem('nickname')
    }
    return (
      <div className={classes.root}>
        <Profile nickname={this.state.nickname} />
        <div className={classes.menu}>
          <div className={classes.navwrapper}>
            <Button onClick={()=>{this.likelist()}} className={classes.navbtn}>喜欢的歌曲</Button>
            <Button onClick={()=>{this.collectlists()}} className={classes.navbtn}>收藏的歌单</Button>
            <Button onClick={()=>{this.createlists()}} className={classes.navbtn}>创建的歌单</Button>
            <div className={classes.grow}></div>
            <Button onClick={()=>{this.changeinfo()}} className={classes.navbtn}>修改个人信息</Button>
          </div>
        </div>
        <Route exact path='/me' render={(props)=>(
          <Likelist likelist={this.state.likelist} {...props} />
        )} />
        <Route path='/me/collectlists' render={(props)=>(
          <Collectlists collectlists={this.state.collectlists} {...props} />
        )} />
        <Route path='/me/createlists' render={(props)=>(
          <Createlists createlists={this.state.createlists} {...props} />
        )} />
        <Route path='/me/changeinfo' render={(props)=>(
          <Changeinfo updateProfile={(nickname)=>{this.updateProfile(nickname)}} user={user} {...props} />
        )} />
      </div>
    )
  }
}

Me.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Me)
