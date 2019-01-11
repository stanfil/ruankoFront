import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button, Table, TableRow, TableBody, TableCell, TableHead } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../setting'
const styles = theme => ({
  root: {
    backgroundColor: "#f3f3f3",
    width: window.outerWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  navbar: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center'
  },
  navbtn:{
    "font-size": 20,
    marginRight: 40
  },
  img: {
    width: 70
  },
  tabletitle: {
    display: 'flex',
    alignItems: 'center',
  },
  tablespan: {
    marginLeft: 20
  }
})

class Boardmore extends Component {
  constructor(props){
    super(props)
    this.state = {
      newsongs: [],
      hotsongs: [],
      upsongs: [],
      boardnow: 'newsongs'
    }
    this.setboard = this.setboard.bind(this)
  }

  setboard = board => () => {
    this.setState({
      boardnow: board
    })
  }

  componentWillMount() {
    axios.get(`${Server}/song/boardnew`)
      .then( res => {
        this.setState({
          newsongs: res.data
        })
        console.log(res.data)
      })
    axios.get(`${Server}/song/boardhot`)
      .then( res => {
        this.setState({
          hotsongs: res.data
        })
        console.log(res.data)
      })
    axios.get(`${Server}/song/boardup`)
      .then( res => {
        this.setState({
          upsongs: res.data
        })
        console.log(res.data)
      })
  }

  render(){
    const { classes } = this.props
    let songs = this.state[this.state.boardnow]
    songs = songs.map((song)=>{
      let m=parseInt(song.interval/60)
      let s=song.interval-m*60
      let interval = `${(m<10)?'0':''}${m}:${(s<10)?'0':''}${s}`
      let ret={
        ...song,
        singers: song.singers.join(' / '),
        interval
      }
      return ret
    })
    return (
      <div className={classes.root}>
        <div className={classes.navbar}>
          <Button className={classes.navbtn} onClick={this.setboard('newsongs')}>新歌榜</Button>
          <Button className={classes.navbtn} onClick={this.setboard('hotsongs')} >热歌榜</Button>
          <Button className={classes.navbtn} onClick={this.setboard('upsongs')} >飙升榜</Button>
        </div>
        <div className={classes.tablewrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>歌曲</TableCell>
                <TableCell>歌手</TableCell>
                <TableCell>时长</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songs.map((song, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell >{i+1}</TableCell>
                    <TableCell className={classes.tabletitle}>
                      <img className={classes.img} alt='' src={`http://${song.img_url}`} />
                      <span className={classes.tablespan}>{`${song.title}`}</span>
                    </TableCell>
                    <TableCell >{song.singers}</TableCell>
                    <TableCell >{song.interval}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

    )
  }
}

Boardmore.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Boardmore)
