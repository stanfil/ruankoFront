import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = themes => ({

})

class AddSong extends Component {
  constructor(props){
    super(props)

  }

  render(){
    const { classes } = this.props
    return (
      <p>addsong</p>
    )
  }
}

AddSong.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddSong)
