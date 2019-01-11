import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Button, } from '@material-ui/core'
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
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tip: {
    "font-size":18,
    "font-weight":300,
    marginLeft: 4,
    paddingTop: 5
  },
  main: {
    width:"62%"
  },
  lists: {
    display: "flex",
    flexDirection: "row",
    "flex-wrap": "wrap",

  },
  listbtn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: 0,
    backgroundColor: "#f3f3f3",
    marginRight: 30,
    marginBottom: 25
  },
  listimg: {
    width: 195
  },
  listp: {
    maxWidth: 195,
  },
  listspan: {
    color: "#999",
    maxWidth: 195,
    display: 'flex',
    // "align-contents": 'flex-start'
  },
  navbar: {
    display: "flex",
    "flexWrap": 'wrap',
    marginTop: 10,
    marginBottom: 20
  }
})

class Songmore extends Component {
  constructor(props){
    super(props)
    this.state = {
      songs:[],
      all: 0,
      currentPage: 0,
      type:'Pop'
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.changePage = this.changePage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.songtype = this.songtype.bind(this)
  }



  componentWillMount() {
    this.handleSearch()
  }
  songClick(i){
    let { history } = this.props
    history.push(`/song/${this.state.songs[i].mid}`)
  }
  songtype = type => () => {
    type = type==="R&B"?'RandB':type
    type = type==="Rap/Hip Hop"?"Rap":type
    this.setState({
      type,
      currentPage: 0
    },()=>{
      this.handleSearch()
    })
  }
  handleSearch(){
    const page = this.state.currentPage
    axios.get(`${Server}/song/bytype?type=${this.state.type}&page=${page?page:1}`)
      .then(res => {
        console.log(res.data.songs)
        const {all, page, songs} = res.data
        this.setState({
          all,
          currentPage: page,
          songs
        })
      }, err => {
        console.log(err)
      })
  }
  changePage(page){
    this.setState({
      currentPage: page
    }, ()=>{this.handleSearch()})

  }
  lastPage(){
    this.setState({
      currentPage: this.state.currentPage-1
    }, ()=>{this.handleSearch()})

  }
  nextPage(){
    this.setState({
      currentPage: this.state.currentPage+1
    },()=>{this.handleSearch()})
  }

  render(){
    const { classes } = this.props
    const songs = this.state.songs
    const types = ['Pop','Rap/Hip Hop','Electronica','Classical','Dance',' Country','Folk','Holiday','J-Pop','Jazz','New Age','R&B','Rock','Soundtrack','World Music','Alternative','Children']
    const typesCN = ['流行','嘻哈','电子','古典','舞曲','乡村','民谣','节日','日本流行','爵士','新世纪','节奏布鲁斯','摇滚','英伦摇滚','世界音乐','另类摇滚','童谣']
    let pages = []
    for(let i=0; i<Math.ceil(this.state.all/10);i++){
      pages.push(<Button onClick={e=>{this.changePage(i+1)}} className={classes.page} key={i+1}>{i+1}</Button>)
    }
    return (
      <div className={classes.root}>
        <div className={classes.navbar}>
          {
            types.map((type, i)=>
              <Button key={i} className={classes.songtype} onClick={this.songtype(type)}>{typesCN[i]}</Button>
            )
          }
        </div>
        <div className={classes.main}>
          <div className={classes.lists}>
          {
            songs.map((song, i)=>(
              <button key={i} className={classes.listbtn} onClick={()=>this.songClick(i)}>
              <img className={classes.listimg} alt='' src={`http://${song.img_url}`} />
              <p className={classes.listp}>{song.title}</p>
              <div className={classes.listspan}>{song.singers.join(' / ')}</div>
              </button>
            ))
          }
          </div>
        </div>
        <div className={classes.pages}>
          {
            (this.state.currentPage>1)?
              <Button onClick={e=>{this.lastPage()}} className={classes.page} >{'<'}</Button>:''
          }
          {pages}
          {
            (this.state.currentPage<Math.ceil(this.state.all/10))?
              <Button onClick={e=>{this.nextPage()}} className={classes.page} >{'>'}</Button>:''
          }
        </div>
      </div>

    )
  }
}

Songmore.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Songmore)
