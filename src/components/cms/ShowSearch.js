import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  btn: {
    border: 0,
    backgroundColor: "#fff",
    width: '50px',
    height: '40px',
    color: '#ef7e7e',
    outline: 'none'
  },
  btncell: {

  }
});

function ShowSearch(props) {
  const { classes } = props;
  const songs = props.songs.map((song) => ({
    mid: song.mid,
    title: song.title,
    singers: song.singers.join('&'),
    album: song.album,
    time_public: song.time_public,
    type: song.type
  }))

  const handleEdit = (e)=>{
    let mid = e.target.name
    props.handleEdit(mid)
  }

  const handleDelete = (e)=>{
    let mid = e.target.name
    props.handleDelete(mid)
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {songs.map((song, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="center">{song.title}</TableCell>
                <TableCell align="center">{song.singers}</TableCell>
                <TableCell align="center">{song.album}</TableCell>
                <TableCell align="center">{song.time_public}</TableCell>
                <TableCell align="center">{song.type}</TableCell>
                <TableCell className={classes.btncell} align="center"><button name={song.mid} className={ classes.btn } onClick={(e)=>{handleEdit(e)}} >编辑</button></TableCell>
                <TableCell className={classes.btncell} align="center"><button name={song.mid} className={ classes.btn } onClick={(e)=>{handleDelete(e)}} >删除</button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ShowSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowSearch);
