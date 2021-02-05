import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c39578' },
    secondary: { main: '#01365d' },
  },
});

export default function RegisterScreen(props) {
  const paperStyle = {
    padding: 20,
    height: '40vh',
    width: 280,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#c39578' };
  const marginTop = { marginTop: 8 };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password mismatch!');
    } else {
      dispatch(register(name, email, password));
    }
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
          <Grid align='center' gutterBottom>
            <Avatar style={avatarStyle}>
              <GroupAddOutlinedIcon fontSize='large' />
            </Avatar>
          </Grid>
          <form style={marginTop}>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
            <TextField
              fullWidth
              label='Name'
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label='Email'
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label='Password'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label='Confirm Password'
              placeholder='Confirm your password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControlLabel
              style={marginTop}
              control={<Checkbox name='checkedA' />}
              label='I accept the terms and conditions.'
            />
            <Button
              style={marginTop}
              type='submit'
              variant='contained'
              color='primary'
              onClick={submitHandler}
              fullWidth>
              <Typography>Sign up</Typography>
            </Button>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
