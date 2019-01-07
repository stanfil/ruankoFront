import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Topbar from '../components/cms/Topbar'
import ShowSearch from '../components/cms/ShowSearch'
const styles = theme => ({
  root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
  },

})

class CMS extends Component {
  constructor(props){
    super(props)
    this.state = {
      songs: [],
      label: "",
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSearch = (label) => {
    this.setState({label})
    if( label === "" ) return;
    let { history } = this.props
    axios.get(`${Server}/getSong?label=${label}`)
      .then( res => {
        this.setState({
          songs: res.data.songs
        })
        if(window.location.hash!=="#/CMS")
          history.push('/CMS')
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

  handleEdit = (mid) => {
    //TODO
    this.handleSearch(this.state.label)
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

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        <Topbar handleLogout={()=>{this.handleLogout()}} handleSearch={(label) => { this.handleSearch(label) }}/>
        <ShowSearch handleEdit={(mid) => { this.handleEdit(mid)}} handleDelete={(mid) => { this.handleDelete(mid)}} songs={this.state.songs}/>
      </div>

    )
  }
}

CMS.propTypes = {
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(CMS)
