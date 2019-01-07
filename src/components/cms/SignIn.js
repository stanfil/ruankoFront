import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    opacity: '0.7',
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    color: '#e43fb5',
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
  },
  warning: {
    color: 'red',
    marginBottom: 0
  }
});

function SignIn(props) {
  const { loginfailed, classes, handleSubmit } = props;

  const onData = (e) => {
    e.preventDefault()
    let username = sessionStorage.getItem('username')
    let password = sessionStorage.getItem('password')
    handleSubmit(username,password)
  }

  const handleBlur = (e) => {
    sessionStorage.setItem(e.target.name, e.target.value)
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ruanko Music 后台管理
        </Typography>
        <form className={classes.form} onSubmit={(e)=>{onData(e)}}>
          <FormControl className={classes.fromcontrol} margin="normal" required fullWidth>
            <InputLabel required={false}>账号</InputLabel>
            <Input name="username" onBlur={ (e) => { handleBlur(e) }}  autoComplete="username" autoFocus defaultValue={""}/>
          </FormControl>
          <FormControl className={classes.fromcontrol} margin="normal" required fullWidth>
            <InputLabel required={false} htmlFor="password">密码</InputLabel>
            <Input name="password" onBlur={ (e) => { handleBlur(e) }} type="password" id="password" autoComplete="current-password" defaultValue={''}/>
          </FormControl>
          {
            loginfailed ?
            <p className={classes.warning}>账号或密码错误</p>
            :''
          }

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登录
          </Button>
        </form>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
