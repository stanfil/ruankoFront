import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import SearchIcon from '@material-ui/icons/Search'
import { AddCircleOutline } from '@material-ui/icons'
const styles = theme => ({
  main: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: "20px",
    "font-weight": "200",
    "font-size": "50px"
  },
  neck: {
    width: "100%",
    height: "150px",
    "background-color": "#f3f3f3",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   width: '600px',
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
 logout: {
   position: 'fixed',
   top: "20px",
   right: '30px',
   outline: 'none',
   backgroundColor: "#fff",
   border: 0,
   "font-size": '20px',
   'font-weight': '300',
   "&:hover": {
     top: "18px",
     opacity: '.8',
   }
 }
})

class Topbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searched: false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSearch = () => {
    let label = this.refs._label.value
    this.setState({searched: true})
    this.props.handleSearch(label)
  }

  handleLogout = () => {
    this.props.handleLogout()
  }

  render(){
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <p className={classes.header} >
        Ruanko Music CMS
        </p>
        <button onClick={()=> {this.handleLogout()}} className={classes.logout} >退出登录</button>
        <div className={ classes.neck }>
          <div className={classes.search}>
            <input ref="_label" className={classes.input} type="text" autoFocus placeholder="搜索关键字"/>
            <button onClick={()=>{ this.handleSearch()}} className={classes.searchIcon}>
              <SearchIcon />
            </button>
          </div>
          <div className={classes.add}>
            {(this.state.searched)?
              (<span className={classes.tip}>没找到歌曲？快来添加</span>):''
            }
            <button className={classes.addbtn}>
              <AddCircleOutline />
            </button>
          </div>
        </div>
      </main>
    )
  }
}

Topbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Topbar)
