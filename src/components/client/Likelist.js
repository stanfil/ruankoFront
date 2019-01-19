import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
const styles = theme => ({
  root:{
    width: 800,
  },
  table: {
    width: "100%"
  }
})

class Likelist extends Component {
  constructor(props){
    super(props)
    this.state={
      likelist: []
    }
  }

  render(){
    const { classes } = this.props
    let songs = this.props.likelist
    songs = songs.map((song)=>{
      let m=parseInt(song.interval/60)
      let s=song.interval-m*60
      let interval = `${(m<10)?'0':''}${m}:${(s<10)?'0':''}${s}`
      let ret={
        ...song,
        singers: song.singers.join(' / '),
        interval
      }
      return ret
    })
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>歌曲</TableCell>
              <TableCell>歌手</TableCell>
              <TableCell>专辑</TableCell>
              <TableCell>时长</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song, i) => {
              return (
                <TableRow key={i}>
                  <TableCell >
                    <a style={{color: '#000', textDecoration: "none"}} href={`/#/song/${song.mid}`}>
                    {song.title}
                    </a>
                  </TableCell>
                  <TableCell >{song.singers}</TableCell>
                  <TableCell >{song.album}</TableCell>
                  <TableCell >{song.interval}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Likelist.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Likelist)
