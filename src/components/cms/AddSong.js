import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { MenuItem, TextField, Input, Button } from '@material-ui/core'
import axios from 'axios'
import { Server } from '../../setting'

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
})

const types = ['Pop','Rap/Hip Hop','Electronnica','Classical','Dance','Country','Folk','Holiday','J-Pop','Jazz','New Age','R&B','Rock','Soundtrack','World Music','Alternative','Children']

class AddSong extends Component {
  constructor(props){
    super(props)
    this.state = {
      song: props.song || {
        mid: '',
        title: '',
        album: '',
        singers: [],
        interval: 0,
        time_public: '',
        type: 'Pop',
        lyric: '',
        img_url: '',
      },

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleChange = name => event => {
    if(name==='singers'){
      this.setState({
        song: {...(this.state.song), [name]: event.target.value.split('&') }
      });
      return;
    }
    this.setState({
      song: {...(this.state.song), [name]: event.target.value }
    });
  }

  handleAdd = ()=>{

    let {history} = this.props
    let username = sessionStorage.getItem('username')
    let song = {
      ...(this.state.song),
      mid: username + (new Date().getTime()),
    }
    console.log(song)
    axios.post(`${Server}/addSong`,{ ...song })
      .then( res=>{
        console.log(res.data)
        alert("添加成功")
        history.push('/CMS')
      })
    console.log(this.fileInput)
    // const blob = new Blob(this.fileInput.files[0])
    let fd = new FormData()
    fd.append('music', this.fileInput.files[0], `${song.mid}.m4a`)
    axios({
      method:'post',
      url: `${Server}/addMusicFile`,
      data: fd,
      headers: {
        "Content-Type":'multipart/form-data'
      }
    })
    .then( res => {
      console.log('上传成功！')
    })
    .catch(err=>{
      console.log('上传失败！')
    })
  }

  handleUpdate = ()=>{

    let {history} = this.props
    let song = {
      ...(this.state.song),
    }
    console.log(song)
    axios.post(`${Server}/updateSong`,{ ...song })
      .then( res=>{
        console.log(res.data)
        alert("修改成功")
        history.push('/CMS')
      })
    let fd = new FormData()
    if(this.fileInput.files[0]){
      fd.append('music', this.fileInput.files[0], `${song.mid}.m4a`)
      axios({
        method:'post',
        url: `${Server}/addMusicFile`,
        data: fd,
        headers: {
          "Content-Type":'multipart/form-data'
        }
      })
      .then( res => {
        console.log('上传成功！')
      })
      .catch(err=>{
        console.log('上传失败！')
      })
    }
  }
  render(){
    const { classes, AorU } = this.props
    const { song, ...values } = this.state
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          defaultValue={song.title}
          id="standard-title"
          label="歌曲名"
          className={classes.textField}
          onChange={this.handleChange('title')}
          margin="normal"
        />
        <TextField
          required
          defaultValue={song.album}
          id="standard-album"
          label="专辑"
          className={classes.textField}
          onChange={this.handleChange('album')}
          margin="normal"
        />
        <TextField
          required
          defaultValue={song.singers.join('&')}
          id="standard-singers"
          label="歌手"
          className={classes.textField}
          onChange={this.handleChange('singers')}
          margin="normal"
          helperText='多个歌手请用‘&’隔开'
        />
        <TextField
          required
          defaultValue={song.interval}
          id="standard-interval"
          label="歌曲时长"
          className={classes.textField}
          onChange={this.handleChange('interval')}
          margin="normal"
          type='number'
          InputLabelProps={
            {shrink: true,}
          }
        />
        <TextField
          required
          defaultValue={song.time_public}
          id="standard-time_public"
          label="发布时间"
          className={classes.textField}
          onChange={this.handleChange('time_public')}
          margin="normal"
        />
        <TextField
          required
          id="standard-type"
          select
          label="歌曲类型"
          className={classes.textField}
          value={song.type}
          onChange={this.handleChange('type')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {types.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-img_url"
          label="歌曲封面图片url"
          defaultValue={song.img_url}
          onChange={this.handleChange('img_url')}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-lyric"
          label="歌词"
          defaultValue={song.lyric}
          onChange={this.handleChange('lyric')}
          style={{ margin: 8 }}
          placeholder="请将.lrc文件内容复制到此处"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Input type='file' inputRef={(input)=>{this.fileInput = input}}/>
        {
          (AorU==='Add')?
          (<Button onClick={()=>{this.handleAdd()}}>添加</Button>):
          (<Button onClick={()=>{this.handleUpdate()}}>修改</Button>)
        }

      </form>
    )
  }
}

AddSong.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddSong)
