import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Server } from '../setting'
import { Paper, Button, FormControl, TextField} from '@material-ui/core';
import { NavLink, Route } from 'react-router-dom'

const styles = theme => ({
  main: {
    width:"100%",
  },
  bg_img: {
    position: 'fixed',
    width: '100%',
    height: 'auto',
    top: '64',
  },
  lbody: {
    marginTop: 300,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    opacity: '0.7',
    // marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
  },
  lists: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",

  },
  li: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow:1,
      color: "#000",
      opacity: .8
  },
  form: {
    // width: "100%",
    marginTop: 0
    // padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  formControl: {
    margin: '0, 30, 20, 30',
  },
  textField: {
    marginLeft:'15%',
    marginRight: '15%'
  },
  btn: {
    marginLeft:'15%',
    marginRight: '15%'
  },
  warning: {
    color: 'red',
    marginBottom: 0,
    marginLeft: '15%'
  }
})

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginfailed: false,
      signinfailed: false,
      inemail: '',
      upemail: '',
      nickname: '',
      inpassword: '',
      uppassword: '',
        active: 0
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleLogin = () => {
    let { history } = this.props
    const payload = {
      email: this.state.inemail,
      password: this.state.inpassword
    }
    axios.post(`${Server}/user/login`, payload)
      .then( res => {
        let {email, nickname} = res.data.user
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('nickname', nickname)
        this.props.handleLogin()
        history.push('/me')
        console.log(res.data.message)
      }, err => {
        this.setState({
          loginfailed: true
        })
        console.log(err)
      })
      .catch( err => {
        console.log(err)
      })
  }

  handleSignup() {
    let { history } = this.props
    const payload = {
      email: this.state.upemail,
      password: this.state.uppassword,
      nickname: this.state.nickname
    }
    axios.get(`${Server}/user/emexist?email=${this.state.upemail}`)
      .then( res => {
        if(res.data.emexist){
          this.setState({signinfailed: true})
        }
        else {
          axios.post(`${Server}/user/signup`, payload)
            .then( res => {
              sessionStorage.setItem('email', this.state.upemail)
              sessionStorage.setItem('nickname', this.state.nickname)
              this.props.handleLogin()
              history.push('/me')
              console.log(res.data)
            })
        }
      })

  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.main }>
        <img className={ classes.bg_img } src={require('../img/bg_login.jpg')} alt=''/>
        <div className={ classes.lbody }>
          <Paper className={classes.paper}>
            <Route render={(props)=>(
              <div className={classes.lists}>
                <li style={{backgroundColor: `${this.state.active?'':'#f5005780'}`}} className={classes.li}>
                  <a style={{color: '#000', textDecoration: 'none'}} href='/#/login'
                    onClick={()=>{this.setState({active: 0})}}
                  >登录</a>
                </li>
                <li style={{backgroundColor: `${this.state.active?'#f5005780':''}`}} className={classes.li}>
                  <a style={{color: '#000', textDecoration: 'none'}} href='/#/login/signup'
                       onClick={()=>{this.setState({active: 1})}}
                  >注册</a>
                </li>
              </div>
            )} />
            <Route exact path='/login' render={(props)=>(
              <div className={classes.form}>
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <TextField
                    label="邮箱"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("inemail")}
                  />
                </FormControl>
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <TextField
                    label="密码"
                    className={classes.textField}
                    margin="normal"
                    type='password'
                    onChange={this.handleChange("inpassword")}
                  />
                </FormControl>
                {
                  this.state.loginfailed ?
                  <p className={classes.warning}>账号或密码错误</p>
                  :''
                }
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <Button onClick={()=>{this.handleLogin()}} className={classes.btn} >登录</Button>
                </FormControl>
              </div>
            )} />
            <Route path='/login/signup' render={(props)=>(
              <div className={classes.form}>
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <TextField
                    label="邮箱"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("upemail")}
                  />
                </FormControl>
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <TextField
                    label="昵称"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange("nickname")}
                  />
                </FormControl>
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <TextField
                    label="密码"
                    className={classes.textField}
                    margin="normal"
                    type='password'
                    onChange={this.handleChange("uppassword")}
                  />
                </FormControl>
                {
                  this.state.signinfailed ?
                  <p className={classes.warning}>邮箱已被注册</p>
                  :''
                }
                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                  <Button onClick={()=>{this.handleSignup()}} className={classes.btn} >注册</Button>
                </FormControl>
              </div>
            )} />

          </Paper>
        </div>

      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(Login)
