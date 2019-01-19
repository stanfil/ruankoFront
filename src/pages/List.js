import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button, Table, TableRow, TableBody, TableCell, TableHead } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../setting'
const styles = theme => ({
  root: {
    width: window.outerWidth
  },
  header: {
    backgroundColor: "#f3f3f3",
    paddingLeft: "15%",
    display: 'flex',
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: "15%",
    marginBottom: 20
  },
  listinfo: {
    marginLeft: 40,
    "font-size": 21,
    "font-weight": 300,
    flexGrow: 1
  },
  listp: {
    "font-size": 28,
    "font-weight": 400,
    opacity: .7
  },
  creator: {
    marginTop: 40,
    "font-weight": 300,
    color: '#333'
  },
  table: {
    maxWidth: "70%",
    marginBottom: 40

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
    justifyContent: 'center'
  },
  disc: {
    width: 270,
    marginTop: 30,
    marginRight: 60
  },
  discp: {
    "font-weight": 300
  },
})

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: {
        songs: [],
      },
      isLogin: (sessionStorage.getItem("email"))?true:false,
    }
    this.likeList=this.likeList.bind(this)
  }

  componentWillMount(){
    const {match}= this.props
    // console.log(match)
    let _id = match.params._id
    axios.get(`${Server}/list/onelist?_id=${_id}`)
      .then(res => {
        this.setState({
          list: res.data
        })
      })
  }

  likeList(){
    if(!this.state.isLogin){
      alert("请登录后收藏~")
      return
    }
    const _id = this.state.list._id
    const email = sessionStorage.getItem("email")
    axios.post(`${Server}/user/collectlist`,{
      email,
      _id
    }).then(res=>{
      alert(res.data)
    })
  }

  render(){
    const { classes, } = this.props
    let list = this.state.list
    let songs = list.songs
    console.log()
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
        <div className={classes.header}>
          <img style={{width: '250px',height: 250}} alt='' src={`http://${list.img_url}`} />
          <div className={classes.listinfo}>
            <p className={classes.listp}>{list.title}</p>
            <div className={classes.creator}><img alt='' style={{marginRight: 10}} src={require('../img/user.png')} />{list.creator}</div>
            <p style={{fontSize: 16}}>收藏量：{list.collectnum}</p>
            <Button variant="outlined" color="primary" style={{fontSize: 16}} onClick={this.likeList}>收藏歌单</Button>
          </div>
          <div className={classes.disc}>
            <p className={classes.discp} style={{"fontSize": 24}}>简介</p>
            <p className={classes.discp} >{list.disc}</p>
          </div>
        </div>
        <div className={classes.body}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>歌曲</TableCell>
                <TableCell>歌手</TableCell>
                <TableCell>专辑</TableCell>
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
                      <a className={classes.tablespan} style={{color: '#000', textDecoration: "none"}} href={`/#/song/${song.mid}`}>
                        {song.title}
                      </a>
                    </TableCell>
                    <TableCell >{song.singers}</TableCell>
                    <TableCell >{song.album}</TableCell>
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

List.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(List)
