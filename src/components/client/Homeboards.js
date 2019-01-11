import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../../setting'

const styles = theme => ({
  rootwrapper: {
    width: window.innerWidth,
    backgroundColor: "#f3f3f3",
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
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  listbtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    "space-between": 10,
    border: 0,
    backgroundColor: "#f3f3f3"
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
  songbtn: {
    border: 0,
    background: "none",
    display: 'flex',
    flexDirection: 'column',
    "space-between": 20,
    alignItems: 'center',
    flexGrow: 1
  },

  boardnew: {
    width: 224,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "background-image": `url(${require('../../img/bg_board.jpg')})`,
    "background-position": '0% 0%',
  },
  boardhot: {
    width: 224,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "background-image": `url(${require('../../img/bg_board.jpg')})`,
    "background-position": '200% 0%',
  },
  boardup: {
    width: 224,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "background-image": `url(${require('../../img/bg_board.jpg')})`,
    "background-position": '100% 0%',
  }
})

class Homeboards extends Component {
  constructor(props){
    super(props)
    this.state={
      newsongs: [],
      hotsongs: [],
      upsongs: []
    }

    this.songClick = this.songClick.bind(this)
    this.boardmore = this.boardmore.bind(this)
  }

  componentWillMount(){
    axios.get(`${Server}/song/boardnew`)
      .then( res => {
        this.setState({
          newsongs: res.data.filter((item, i)=>(i<5))
        })
        console.log(res.data.filter((item, i)=>(i<5)))
      })
    axios.get(`${Server}/song/boardhot`)
      .then( res => {
        this.setState({
          hotsongs: res.data.filter((item, i)=>(i<5))
        })
        console.log(res.data.filter((item, i)=>(i<5)))
      })
    axios.get(`${Server}/song/boardup`)
      .then( res => {
        this.setState({
          upsongs: res.data.filter((item, i)=>(i<5))
        })
        console.log(res.data.filter((item, i)=>(i<5)))
      })
  }

  songClick(mid){
    let { history } = this.props
    history.push(`/song/${mid}`)
  }

  boardmore(){
    let { history } = this.props
    history.push(`/boardmore`)
  }

  render(){
    const { classes } = this.props
    let newsongs = this.state.newsongs
    let hotsongs = this.state.hotsongs
    let upsongs = this.state.upsongs

    return (
      <div className={classes.rootwrapper}>
        <div className={classes.root}>
          <div className={classes.header}>
            <h2 className={classes.hh2}>排行榜</h2>
            <Button onClick={()=>{this.boardmore()}} className={classes.more}>更多</Button>
          </div>
          <div className={classes.lists}>
            <div className={classes.boardnew}>
              <h2>新歌榜</h2>
              {
                newsongs.map((song, i)=>(
                  <button key={i} onClick={()=>{this.songClick(song.mid)}} className={classes.songbtn}>
                    <span>{`${i+1} ${song.title}`}</span>
                    <span>{`  ${song.singers.join(' / ')}`}</span>
                  </button>
                ))
              }
            </div>
            <div className={classes.boardhot}>
              <h2>热歌榜</h2>
              {
                hotsongs.map((song, i)=>(
                  <button key={i} onClick={()=>{this.songClick(song.mid)}} className={classes.songbtn}>
                    <span>{`${i+1} ${song.title}`}</span>
                    <span>{`  ${song.singers.join(' / ')}`}</span>
                  </button>
                ))
              }
            </div>
            <div className={classes.boardup}>
              <h2>飙升榜</h2>
              {
                upsongs.map((song, i)=>(
                  <button key={i} onClick={()=>{this.songClick(song.mid)}} className={classes.songbtn}>
                    <span>{`${i+1} ${song.title}`}</span>
                    <span>{`  ${song.singers.join(' / ')}`}</span>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Homeboards.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Homeboards)
