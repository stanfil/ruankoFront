import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button, } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../setting'
import { getLrcArray } from '../translrc'

const styles = theme => ({
  root: {
    width: window.outerWidth,

  },
  header: {
    backgroundColor: "#f3f3f3",
    display: 'flex',
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerinner: {
    display: 'flex',
  },
  songinfo: {
    marginLeft: 40,
    "font-size": 15,
    "font-weight": 300,
    flexGrow: 1
  },
  songp: {
    "font-size": 25,
    "font-weight": 400,
    marginTop: 10,
    marginBottom: 10
  },
  singers: {
    marginTop: 15,
    "font-weight": 300,
    color: '#333'
  },
  table: {
    maxWidth: "70%"
  },
  tabletitle: {
    display: 'flex',
    alignItems: 'center',
  },
  tablespan: {
    marginLeft: 20
  },
  img: {
    width: 70
  },
  body: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center'
  },
  lyric: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    "font-size": "14px",
    "line-height": "26px"
  },
  showall: {
    padding: 0,
    color: "#31c27c",
    background: 'none',
    border: 0,
    outline: "none",
    cursor: "pointer",
    marginBottom: 40,
  }
})

class Song extends Component {
  constructor(props){
    super(props)
    this.state = {
      song: {
        singers:[],
        lyric: ""
      }
    }
    this.changeLrcState = this.changeLrcState.bind(this)
    this.playsong = this.playsong.bind(this)
  }

  componentWillMount(){
    const {match}= this.props
    // console.log(match)
    let mid = match.params.mid
    axios.get(`${Server}/song/onesong?mid=${mid}`)
      .then(res => {
        this.setState({
          song: res.data,
          showAlllrc: false
        })
      })
  }
  changeLrcState() {
    this.setState({
      showAlllrc: !this.state.showAlllrc
    })
  }
  playsong (){
    let { history } = this.props
    this.props.updatePlaylist([this.state.song.mid])
    history.push('/player')
  }
  render(){
    const { classes, } = this.props
    let song = this.state.song
    let lrcarr = []
    // console.log(song.lyric)
    if(song.lyric!==''){
      lrcarr = getLrcArray(song.lyric)
      console.log(lrcarr)
    }
    console.log(lrcarr)
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerinner}>
            <img style={{width: '250px',height: 250}} alt='' src={`http://${song.img_url}`} />
            <div className={classes.songinfo}>
            <p className={classes.songp}>{song.title}</p>
            <div className={classes.singers}><img alt='' style={{marginRight: 10}} src={require('../img/user.png')} />{song.singers.join(' / ')}</div>
            <p>专辑：{song.album}</p>
            <p>类型：{song.type}</p>
            <p>发行时间：{song.time_public}</p>
            <div className={classes.songops}>
            <Button variant='outlined' color='primary' onClick={this.playsong}>立即播放</Button>
            </div>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <p style={{"fontWeight":300, "fontSize": 25}} >歌词</p>
          <div className={classes.lyric}>
          {
            (lrcarr!==undefined)?lrcarr.map((line, i)=>{
              let ret = <p style={{margin:0}} key={i} >{line.content}</p>
              if(i>14 && !this.state.showAlllrc){
                ret = ""
              }
              return ret
            }):''
          }
          {
            (this.state.showAlllrc)?
            <button onClick={()=>{this.changeLrcState()}} className={classes.showall}>[收起]</button>:
            <button onClick={()=>{this.changeLrcState()}} className={classes.showall}>[展开]</button>
          }
          </div>

        </div>
      </div>
    )
  }
}

Song.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Song)
