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

class Collectlists extends Component {
  constructor(props){
    super(props)
    this.state={
      collectlists: []
    }
  }

  render(){
    const { classes } = this.props
    let lists = this.props.collectlists
    return (
      <div className={classes.root}>
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

Collectlists.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collectlists)
