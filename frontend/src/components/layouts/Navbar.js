import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
import logo from '../../components/images/logo.png';
import Drawer from '../../components/layouts/drawer';

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
  logo: {
    maxWidth: 50,
    marginRight: theme.spacing(2),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '1.0rem',
  },
}))(Badge);

export default function Navbar() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

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

  useEffect(() => {
    window.addEventListener('resize', handleClose);
    return () => window.removeEventListener('resize', handleClose);
  });

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static' elevation={0}>
        <Toolbar>
          <Typography variant='h3' className={classes.title}>
            <img src={logo} alt='HMD' className={classes.logo} />
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button color='primary' component={Link} to='/'>
              <HomeOutlinedIcon fontSize='large' />
            </Button>

            <Button color='primary' component={Link} to='/cart'>
              {cartItems.length > 0 ? (
                <StyledBadge
                  badgeContent={cartItems.length}
                  color='primary'
                  fullWidth>
                  <ShoppingCartOutlinedIcon fontSize='large' />
                </StyledBadge>
              ) : (
                <ShoppingCartOutlinedIcon fontSize='large' />
              )}
            </Button>

            {userInfo ? (
              <Button
                color='primary'
                component={Link}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'>
                <AccountCircleOutlinedIcon fontSize='large' />
                <i className='fa fa-caret-down'></i>
              </Button>
            ) : (
              <Button color='primary' component={Link} to='/signin'>
                <PersonAddOutlinedIcon fontSize='large' />
              </Button>
            )}
          </div>
          <div className={classes.menuButton}>
            <Drawer />

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
