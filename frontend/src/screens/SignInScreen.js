import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c39578' },
    secondary: { main: '#01365d' },
  },
});
export default function SignInScreen(props) {
  const paperStyle = {
    padding: 20,
    height: '40vh',
    width: 280,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#c39578' };
  const btnstyle = { margin: '8px 0' };
  const marginTop = { marginTop: 8 };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center' style={marginTop}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon fontSize='large' />
            </Avatar>
          </Grid>
          <form style={marginTop}>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
            <TextField
              label='Username'
              placeholder='Enter username'
              onChange={(e) => setEmail(e.target.value)}
              fontSize='large'
              fullWidth
              required
            />
            <TextField
              label='Password'
              placeholder='Enter password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <FormControlLabel
              style={marginTop}
              control={<Checkbox name='checkedB' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              onClick={submitHandler}
              color='primary'
              variant='contained'
              style={btnstyle}
              fullWidth>
              <Typography> Sign in</Typography>
            </Button>
            <Typography>
              <Link to='#'>Forgot password? </Link>
            </Typography>
            <Typography>
              New Customer?{' '}
              <Link to={`/register?redirect=${redirect}`}>Sign Up</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
