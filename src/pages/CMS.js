import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { } from '@material-ui/core'
import Topbar from '../components/cms/Topbar'
import ShowSearch from '../components/cms/ShowSearch'
import AddSong from '../components/cms/AddSong'
const styles = theme => ({
  root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: '100vh'
  },
    rootwrapper: {
        paddingBottom: 40,
    }
})

class CMS extends Component {
  constructor(props){
    super(props)
    this.state = {
      songs: [],
      label: "",
      editingSong: {}
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleSearch = (label) => {
    this.setState({label})
    if( label === "" ) {
      this.setState({songs:[]})
      return;
    }
    let { history } = this.props
    axios.get(`${Server}/getSong?label=${label}`)
      .then( res => {
        this.setState({
          songs: res.data.songs
        })
        if(window.location.hash!=="#/CMS/showsearch")
          history.push('/CMS/showsearch')
        console.log(this.state.songs)
      }, err => {
        console.log(err)
      })
  }

  handleLogout = ()=>{
    let { history } = this.props
    let admin = sessionStorage.getItem('admin')
    console.log('logout:', admin)
    axios.get(`${Server}/admin/logout?username=${admin}`)
      .then( res => {
        console.log(res.data)
        sessionStorage.clear()
        history.push('/adminlogin')
      }, err=>{
        console.log('logout failed')
      })
  }

  handleDelete = (mid) => {
    console.log('mid:', mid)
    axios.post(`${Server}/deleteSong`, { mid })
      .then( res => {
        console.log(res.data)
        this.setState({
          songs: this.state.songs.filter(song=>(song.mid!==mid))
        })
      })
  }

  handleAdd = () => {
    let { history } = this.props
    history.push('/CMS/addsong')
  }

  handleEdit = (mid) => {
    let { history } = this.props
    this.setState({
      editingSong: this.state.songs.filter((song)=>(song.mid===mid))[0]
    })
    console.log(this.state.editingSong)
    history.push('/CMS/updatesong')
  }



  render() {
    const { classes } = this.props
    return (
      <div className={ classes.rootwrapper}>
        <div className={ classes.root }>
        <Route render={(props) => <Topbar {...props} handleAdd={()=>{this.handleAdd()}} handleLogout={()=>{this.handleLogout()}} handleSearch={(label) => { this.handleSearch(label) }}/>} />
        <Route exact path='/CMS/showsearch' render={(props) => <ShowSearch {...props} handleEdit={(mid) => { this.handleEdit(mid)}} handleDelete={(mid) => { this.handleDelete(mid)}} songs={this.state.songs}/>} />
        <Route path='/CMS/addsong' render={(props) => <AddSong {...props} AorU="Add"/>}/>
        <Route path='/CMS/updatesong' render={(props) => <AddSong {...props} song={this.state.editingSong} />} AorU="Update"/>
        </div>
      </div>

    )
  }
}

CMS.propTypes = {
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(CMS)
