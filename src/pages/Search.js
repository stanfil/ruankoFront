import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    maxWidth: '70%',
    minWidth: 700,
  },
  btn: {
    border: 0,
    backgroundColor: "#fff",
    width: '50px',
    height: '40px',
    color: '#ef7e7e',
    outline: 'none'
  },
  btncell: {

  },
  bg_img: {
    height: 240,
    width: '100%',
  },
  neck: {
    height: 240,
    width: '100%',
    "background-image": `url(${require('../img/bg_search.jpg')})`,
    "background-size": "100% 100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   width: '700px',
   height: '50px',
   paddingRight: 0
 },
  searchIcon: {
   border: 0,
   backgroundColor: "#fff",
   width: '50px',
   height: '50px',
   position: 'relative',
   // pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   right: "50px",
   opacity: '0.8',
   '&:hover': {
     color: '#31c27c',
     opacity: '0.8',
   },
   outline: 'none',
 },
  input: {
   marginLeft: '50px',
   width: '100%',
   height: '100%',
   paddingLeft: "8px",
   borderRadius: theme.shape.borderRadius,
   backgroundColor: "#ffffff",
   "font-size": "22px",
   "font-weight": "300",
   border: 'solid 1px #ccc',
 },
 pages: {
   display: 'flex',
   flexDirection:'row',
   justifyContent: 'center'
 }
});

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      songs:[],
      label:this.props.label||'',
      all: 0,
      currentPage: 0,
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.changePage = this.changePage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

  }

  componentDidMount(){
    this.handleSearch()
  }

  handleSearch(){
    const label = this.state.label
    if( label === "" ) {
      this.setState({songs:[], currentPage:0, all:0})
      return;
    }
    const page = this.state.currentPage
    // console.log("search:",page)
    axios.get(`${Server}/song/search?label=${label}&page=${page?page:1}`)
      .then(res => {
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
    // console.log("set:",page)
    this.setState({
      currentPage: page
    }, ()=>{this.handleSearch()})
    // console.log('change:',this.state.currentPage)

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


  handleChange(e){
    this.setState({
      label: e.target.value,
    })
  }

  handleKeypress(e){
    if(e.which === 13){
      this.handleSearch()
    }
  }
  render(){
    const {classes} = this.props
    let songs = this.state.songs
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
    let pages = []
    for(let i=0; i<Math.ceil(this.state.all/10);i++){
      pages.push(<button onClick={e=>{this.changePage(i+1)}} className={classes.page} key={i+1}>{i+1}</button>)
    }
    return (
      <Paper className={classes.root}>
        <div className={classes.neck}>
          <div className={classes.search}>
            <input defaultValue={this.props.label} onKeyPress={e=>this.handleKeypress(e)} onChange={e=>{this.handleChange(e)}} className={classes.input} type="text" autoFocus placeholder="搜索关键字"/>
            <button onClick={(e)=>{this.handleSearch(e)}} className={classes.searchIcon}>
              <SearchIcon />
            </button>
          </div>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
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
                  <TableCell >{song.title}</TableCell>
                  <TableCell >{song.singers}</TableCell>
                  <TableCell >{song.album}</TableCell>
                  <TableCell >{song.interval}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={classes.pages}>
          {
            (this.state.currentPage>1)?
              <button onClick={e=>{this.lastPage()}} className={classes.page} >{'<'}</button>:''
          }
          {pages}
          {
            (this.state.currentPage<Math.ceil(this.state.all/10))?
              <button onClick={e=>{this.nextPage()}} className={classes.page} >{'>'}</button>:''
          }
        </div>
      </Paper>
    );
  }
}


Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
