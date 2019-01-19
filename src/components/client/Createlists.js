import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import {Server} from '../../setting'
import axios from 'axios'
const styles = theme => ({
  root:{
    width: 800,
    position: "relative",
    top: -70
  },
  table: {
    width: "100%",
    marginBottom: '20px'
  },
  newlist: {
    position: "relative",
    top: 50,
    left: -150
  }
})

class Createlists extends Component {
  constructor(props){
    super(props)
    this.state={
      createlists: [],
      open: false,
      title: '',
      disc: ''
    }
    this.handleClickOpen=this.handleClickOpen.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleClickOpen(){
    this.setState({open:true})
  }

  handleClose(){
    this.setState({open: false})
  }
  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }
  handleSubmit(){
    const {title, disc} = this.state
    const email = sessionStorage.getItem("email")
    const nickname = sessionStorage.getItem("nickname")
    this.handleClose()
    axios.post(`${Server}/list/createlist`, {
      title,
      disc,
      creator: nickname,
      creatorem: email
    }).then(res=> {
      this.props.updateCreatelists()
    })
  }
  render(){
    const { classes } = this.props
    let lists = this.props.createlists
    return (
      <div className={classes.root}>
        <Button variant='outlined' onClick={this.handleClickOpen} className={classes.newlist} color="primary">新建歌单</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">创建歌单</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="歌单名"
                fullWidth
                onChange={this.handleChange('title')}
            />
            <TextField
                autoFocus
                margin="dense"
                label="描述"
                fullWidth
                onChange={this.handleChange('disc')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              创建
            </Button>
          </DialogActions>
        </Dialog>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>歌单名</TableCell>
              <TableCell>创建者</TableCell>
              <TableCell>收藏量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list, i) => {
              return (
                <TableRow key={i}>
                  <TableCell >
                    <a style={{color: '#000', textDecoration: "none"}} href={`/#/list/${list._id}`}>
                      {list.title}
                    </a>
                  </TableCell>
                  <TableCell >{list.creator}</TableCell>
                  <TableCell >{list.collectnum}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

      </div>
    )
  }
}

Createlists.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Createlists)
