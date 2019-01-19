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
    justifyContent: 'center',
    paddingLeft: 65
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
    backgroundColor: "#f3f3f3",
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
    this.playList = this.playList.bind(this)
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

  playList = i => () => {
    let { history } = this.props
    axios.get(`${Server}/list/onelist?_id=${this.state.lists[i]._id}`)
        .then(res=> {
          let songs = res.data.songs.map(item=> item.mid)
          this.props.updatePlaylist(songs)
          history.push(`/player`)
        })
  }

  render(){
    const { classes } = this.props
    let lists = this.state.lists
    return (
      <div className={classes.rootwrapper}>
        <div className={classes.root}>
          <div className={classes.header}>
            <h2 className={classes.hh2}>歌单推荐</h2>
            <Button onClick={()=>{this.listmore()}} className={classes.more}>{"更多 >"}</Button>
          </div>
          <div className={classes.lists}>
            {
              lists.map((list, i)=>(
                <div className={classes.listWrapper} key={i}>
                  <div className={classes.imgWrapper}>
                    <img label="播放歌单" onClick={this.playList(i)} className={classes.listimg} alt='' src={`http://${list.img_url}`} />
                    {/*<div className={classes.mask}>*/}
                      {/*<span style={{fontSize:50, color: '#545454'}} className="iconfont">&#xe662;</span>*/}
                    {/*</div>*/}
                  </div>
                  <button key={i} className={classes.listbtn} onClick={()=>this.listClick(i)}>
                    <p className={classes.listp}>{list.title}</p>
                    <span className={classes.listspan}>收藏量：{list.collectnum}</span>
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

Homelists.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Homelists)
