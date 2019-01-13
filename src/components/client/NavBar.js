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
  nav: {
    color: 'white',
    marginLeft: 20,
  },
  login: {
    marginLeft: 20,
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    color: 'white',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
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
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: 200,
  },
})

class NavBar extends Component {
  constructor(props){
    super(props)

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
        <AppBar position="static">
          <Toolbar>
            <a href='/#/'>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              软酷音乐
              </Typography>
            </a>

            <a className={classes.nav} href='/#/'>音乐馆</a>
            <a className={classes.nav} href={(this.props.isLogin?'/#/me':'/#/login')}>我的音乐</a>
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
              <a onClick={(e)=>{this.handleLogout(e)}} className={classes.login} href='/#/'>退出登录</a>:
              <a className={classes.login} href='/#/login'>登录</a>
            }

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
