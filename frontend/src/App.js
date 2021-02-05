import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { purple, green, blue } from '@material-ui/core/colors';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layouts/Navbar';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import { PictureAsPdfOutlined } from '../node_modules/@material-ui/icons/index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c39578' },
    secondary: { main: '#01365d' },
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container className={classes.root} disableGutters>
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
        <Switch>
          <Route exact path='/cart/:id?' component={CartScreen}></Route>
          <Route exact path='/product/:id' component={ProductScreen}></Route>
          <Route exact path='/signin' component={SignInScreen}></Route>
          <Route exact path='/register' component={RegisterScreen}></Route>
          <Route
            exact
            path='/shipping'
            component={ShippingAddressScreen}></Route>
          <Route exact path='/payment' component={PaymentMethodScreen}></Route>
          <Route exact path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route exact path='/order/:id' component={OrderScreen}></Route>
          <Route
            exact
            path='/orderhistory'
            component={OrderHistoryScreen}></Route>
          <PrivateRoute
            exact
            path='/profile'
            component={ProfileScreen}></PrivateRoute>
          <Route exact path='/' component={HomeScreen}></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
