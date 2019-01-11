import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../../setting'

const styles = theme => ({
  rootwrapper: {
    width: window.innerWidth,
    backgroundColor: "#fff",
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 30
    
  },
  root: {
    display: 'relative'
  },

  header: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hh2: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  lists: {
    display: "flex",
    flexDirection: "row"
  },
  listbtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    "space-between": 10,
    border: 0,
    backgroundColor: "#fff"
  },
  listimg: {
    width: 195
  },
  listp: {
    maxWidth: 195,
  },
  listspan: {
    color: "#999"
  },
  more: {
    // display: "absolute",
    // top: 10,
    // right: 10,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    "space-between": 20,
  }
})

class Homesongs extends Component {
  constructor(props){
    super(props)
    this.state={
      songs: []
    }

    this.songClick = this.songClick.bind(this)
    this.songmore = this.songmore.bind(this)
    this.songtype = this.songtype.bind(this)
  }

  componentWillMount(){
    axios.get(`${Server}/song/bytype?type=Pop&page=1`)
      .then( res => {
        this.setState({
          songs: res.data.songs.filter((item, i)=>(i<5))
        })
        console.log(res.data.songs.filter((item, i)=>(i<5)))
      })

  }

  songClick(i){
    let { history } = this.props
    history.push(`/song/${this.state.songs[i].mid}`)
  }

  songmore(){
    let { history } = this.props
    history.push(`/songmore`)
  }

  songtype = type => () => {
    axios.get(`${Server}/song/bytype?type=${type}&page=1`)
      .then( res => {
        this.setState({
          songs: res.data.songs.filter((item, i)=>(i<5))
        })
        console.log(res.data.songs.filter((item, i)=>(i<5)))
      })
  }

  render(){
    const { classes } = this.props
    let songs = this.state.songs
    return (
      <div className={classes.rootwrapper}>
        <div className={classes.root}>
          <div className={classes.header}>
            <h2 className={classes.hh2}>新歌首发</h2>
            <Button onClick={()=>{this.songmore()}} className={classes.more}>更多</Button>
          </div>
          <div className={classes.navbar}>
            <Button className={classes.songtype} onClick={this.songtype('Pop')}>流行</Button>
            <Button className={classes.songtype} onClick={this.songtype('Rock')}>摇滚</Button>
            <Button className={classes.songtype} onClick={this.songtype('RandB')}>R&B</Button>
            <Button className={classes.songtype} onClick={this.songtype('Electronica')}>电子</Button>
          </div>
          <div className={classes.lists}>
          {
            songs.map((song, i)=>(
              <button key={i} className={classes.listbtn} onClick={()=>this.songClick(i)}>
              <img className={classes.listimg} alt='' src={`http://${song.img_url}`} />
              <p className={classes.listp}>{song.title}</p>
              <span className={classes.listspan}>{song.singers.join(' / ')}</span>
              </button>
            ))
          }
          </div>
        </div>
      </div>

    )
  }
}

Homesongs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Homesongs)
