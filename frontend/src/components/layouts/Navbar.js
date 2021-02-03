import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutHandler = () => {
    setAnchorEl(null);
    dispatch(signout());
  };

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static' elevation={0}>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            HMD
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button color='inherit' component={Link} to='/'>
              <HomeIcon fontSize='large' />
            </Button>

            <Button color='inherit' component={Link} to='/cart'>
              {cartItems.length > 0 ? (
                <Badge badgeContent={cartItems.length} color='secondary'>
                  <ShoppingCartIcon fontSize='large' />
                </Badge>
              ) : (
                <ShoppingCartIcon fontSize='large' />
              )}
            </Button>

            {userInfo ? (
              <Button
                color='inherit'
                component={Link}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'>
                <PersonIcon fontSize='large' />
                <i className='fa fa-caret-down'></i>
              </Button>
            ) : (
              <Button color='inherit' component={Link} to='/signin'>
                Sign In
              </Button>
            )}
          </div>
          <div className={classes.menuButton}>
            <IconButton
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'>
              <MenuIcon fontSize='large' />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}>
              {userInfo ? (
                <div>
                  {userInfo.isAdmin && (
                    <div>
                      <MenuItem
                        onClick={handleClose}
                        color='inherit'
                        component={Link}
                        to='/dashboard'>
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        color='inherit'
                        component={Link}
                        to='/productlist'>
                        Products
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        color='inherit'
                        component={Link}
                        to='/orderlist'>
                        Orders
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        color='inherit'
                        component={Link}
                        to='/userlist'>
                        Users
                      </MenuItem>
                    </div>
                  )}
                  <MenuItem
                    onClick={handleClose}
                    color='inherit'
                    component={Link}
                    to='/profile'>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    color='inherit'
                    component={Link}
                    to='/orderhistory'>
                    Order History
                  </MenuItem>
                  <MenuItem
                    onClick={signoutHandler}
                    color='inherit'
                    component={Link}
                    to='/'>
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem
                    onClick={handleClose}
                    color='inherit'
                    component={Link}
                    to='/signin'>
                    Sign In
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
