import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../../setting'

const styles = theme => ({
  root:{
    display: "flex",
    flexDirection: 'column',
  },
  textField: {
    width: 200
  }
})

class Collectlists extends Component {
  constructor(props){
    super(props)
    this.state={
      email: '',
      nickname: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }

  handleClick(){
    const payload = {
      email: sessionStorage.getItem('email'),
      nickname: this.state.nickname,
      password: this.state.password
    }
    axios.post(`${Server}/user/changeinfo`,payload)
      .then( res => {
        console.log(res)
        sessionStorage.setItem('nickname',this.state.nickname)
        this.props.updateProfile(this.state.nickname)
      })
  }

  render(){
    const { classes, user } = this.props
    let { email, nickname } = user
    return (
      <div className={classes.root}>
        <TextField
          disabled
          defaultValue={email}
          id="standard-email"
          label="邮箱"
          className={classes.textField}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <TextField
          defaultValue={nickname}
          id="standard-nickname"
          label="昵称"
          className={classes.textField}
          onChange={this.handleChange('nickname')}
          margin="normal"
        />
        <TextField
          id="standard-password"
          type='password'
          label="密码"
          className={classes.textField}
          onChange={this.handleChange('password')}
          margin="normal"
        />
        <Button onClick={e=>this.handleClick()}>确认修改</Button>
      </div>
    )
  }
}

Collectlists.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collectlists)
