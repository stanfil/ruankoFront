import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { AppBar, Toolbar, Typography, InputBase, } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '70%',
  },
  appBar: {

  },
  nav: {
    color: '#000',
    textDecoration: 'none',
    paddingLeft: 30,
    paddingRight: 30,
    height: "64px",
    display: 'flex',
    alignItems: 'center'
  },
  login: {
    color: '#000',
    marginLeft: 40,
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 400,
    fontSize:26,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: '20px'

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
    border: '1px solid #b7b1b1'
  },
  searchIcon: {
    width: 40,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 40,
    width: "100%",
  },
  logo: {
    textDecoration: 'none',
    color: '#000',
    display: 'flex',
    marginRight: '20'
  }
})

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: 0
    }
    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

  }

  handleKeypress = (e)=> {
    // console.log(e.charCode)  13
    // console.log(e.keyCode)  0
    // console.log(e.which)  13
    if(e.which === 13){
      let {history} = this.props
      let label = this.textInput.value
      // console.log(label)
      this.props.handleSearch(label)
      if(window.location.hash==='#/search') return
      history.push('/search')
    }
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.handleLogout()
    let {history}= this.props
    if(window.location.hash!=='#/')
      history.push('/')
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.appBar}>
          <Toolbar>
            <a onClick={()=>{this.setState({active: 0})}} className={classes.logo} href='/#/'>
              <img style={{}} src={require('../../img/logo.png')} alt=""/>
              <div className={classes.title}>
              软酷音乐
              </div>
            </a>

            <a onClick={()=>{this.setState({active: 0})}} style={{backgroundColor: `${this.state.active?"#fff":"#31c27c"}`}} className={classes.nav} href='/#/'>音乐馆</a>
            <a onClick={()=>{this.setState({active: 1})}} style={{backgroundColor: `${!(this.state.active)?"#fff":"#31c27c"}`}} className={classes.nav} href={(this.props.isLogin?'/#/me':'/#/login')}>我的音乐</a>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                inputRef={(input)=>{this.textInput = input}}
                onKeyPress={(e)=>{this.handleKeypress(e)}}
                // inputProps={{onKeyPress:(e)=>{this.handleKeypress(e)}}}
                placeholder="搜索关键字"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            {
              (this.props.isLogin)?
              <a onClick={(e)=>{this.setState({active: 0}); this.handleLogout(e)}} className={classes.login} href='/#/'>退出登录</a>:
              <a className={classes.login} href='/#/login'>登录</a>
            }

          </Toolbar>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
