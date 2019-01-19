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
    display: 'relative',
    width: '60%'
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
    paddingLeft: 65,
    justifyContent: 'center',
  },
  lists: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  listbtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    backgroundColor: "#fff",
    outline: 'none',
    cursor: 'pointer'
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgWrapper: {
    display: "relative"
  },
  listimg: {
    width: 195,
    cursor: 'pointer'
  },
  mask: {
    display: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: '100%',
    backgroundColor: '#000',
    opacity: 0,
    "&hover": {
      opacity: 0.2
    },
    transition: "opacity .5s"
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
    this.playSong = this.playSong.bind(this)
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

  playSong = i => () => {
    let { history } = this.props
    this.props.updatePlaylist([this.state.songs[i].mid])
    history.push(`/player`)
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
            <Button onClick={()=>{this.songmore()}} className={classes.more}>{"更多 >"}</Button>
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
                <div className={classes.listWrapper} key={i}>
                  <div className={classes.imgWrapper}>
                    <img label="播放歌曲" onClick={this.playSong(i)} className={classes.listimg} alt='' src={`http://${song.img_url}`} />
                  </div>
                  <button key={i} className={classes.listbtn} onClick={()=>this.songClick(i)}>
                    <p className={classes.listp}>{song.title}</p>
                    <span className={classes.listspan}>{song.singers.join(' / ')}</span>
                  </button>
                </div>

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
