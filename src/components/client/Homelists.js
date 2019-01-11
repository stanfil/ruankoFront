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
    flexDirection: "row"
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
  }
})

class Homelists extends Component {
  constructor(props){
    super(props)
    this.state={
      lists: []
    }

    this.listClick = this.listClick.bind(this)
    this.listmore = this.listmore.bind(this)
  }

  componentWillMount(){
    axios.get(`${Server}/list/getlist?page=1`)
      .then( res => {
        this.setState({
          lists: res.data.lists.filter((item, i)=>(i<5))
        })
        console.log(res.data.lists.filter((item, i)=>(i<5)))
      })

  }

  listClick(i){
    let { history } = this.props
    history.push(`/list/${this.state.lists[i]._id}`)
  }

  listmore(){
    let { history } = this.props
    history.push(`/listmore`)
  }

  render(){
    const { classes } = this.props
    let lists = this.state.lists
    return (
      <div className={classes.rootwrapper}>
        <div className={classes.root}>
          <div className={classes.header}>
            <h2 className={classes.hh2}>歌单推荐</h2>
            <Button onClick={()=>{this.listmore()}} className={classes.more}>更多</Button>
          </div>
          <div className={classes.lists}>
            {
              lists.map((list, i)=>(
                <button key={i} className={classes.listbtn} onClick={()=>this.listClick(i)}>
                <img className={classes.listimg} alt='' src={`http://${list.img_url}`} />
                <p className={classes.listp}>{list.title}</p>
                <span className={classes.listspan}>收藏量：{list.collectnum}</span>
                </button>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

Homelists.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Homelists)
