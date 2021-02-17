import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c39578' },
    secondary: { main: '#01365d' },
  },
});

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='primary'>
        <Container maxWidth='md'>
          <Toolbar>
            <Typography
              variant='subtitle1'
              align='center'
              color='textSecondary'
              component='p'>
              Something here to give the footer a purpose!
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {'Copyright ©'}
              <Link color='inherit' href='https://material-ui.com/'>
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
