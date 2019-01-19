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
    outline: 'none',
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
    color: "#999"
  },
})

class Listmore extends Component {
  constructor(props){
    super(props)
    this.state = {
      lists:[],
      all: 0,
      currentPage: 0,
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.changePage = this.changePage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }



  componentWillMount() {
    this.handleSearch()
  }

  listClick(i){
    let { history } = this.props
    history.push(`/list/${this.state.lists[i]._id}`)
  }

  handleSearch(){
    const page = this.state.currentPage
    axios.get(`${Server}/list/getlist?page=${page?page:1}`)
      .then(res => {
        const {all, page, lists} = res.data
        this.setState({
          all,
          currentPage: page,
          lists
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
    const lists = this.state.lists
    let pages = []
    for(let i=0; i<Math.ceil(this.state.all/10);i++){
      pages.push(<Button style={{backgroundColor: `${this.state.currentPage===(i+1)?"#31c27c":""}`}} onClick={e=>{this.changePage(i+1)}} className={classes.page} key={i+1}>{i+1}</Button>)
    }
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <h2>全部歌单</h2>
          <div className={classes.tip} >（按收藏量排序）</div>
        </div>
        <div className={classes.main}>
          <div className={classes.lists}>
            {
              lists.map((list, i)=>(
                <button key={i} className={classes.listbtn} onClick={()=>this.listClick(i)}>
                <img className={classes.listimg} alt='' src={`http://${list.img_url}`} />
                <p className={classes.listp}>{list.title}</p>
                <span className={classes.listspan}>{list.creator}</span>
                <span className={classes.listspan}>收藏量：{list.collectnum}</span>
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

Listmore.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Listmore)
