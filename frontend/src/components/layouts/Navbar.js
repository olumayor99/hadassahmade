import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { makeStyles } from '@material-ui/core/styles';
import { signout } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const openMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const mobileMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      id='mobile-menu'
      keepMounted
      open={isMenuOpen}>
      <MenuItem component={Link} to='/' onClick={closeMenu}>
        Home
      </MenuItem>
      <MenuItem component={Link} to='/cart' onClick={closeMenu}>
        Cart
        {cartItems.length > 0 && (
          <span className='badge'>{cartItems.length}</span>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <div>
        <AppBar color='primary' position='static'>
          <Toolbar>
            <Typography variant='h4' style={{ flexGrow: 1 }} component={Link}>
              HMD
            </Typography>
            <div className={classes.sectionDesktop}>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>

              <Button color='inherit' component={Link} to='/cart'>
                Cart
                {cartItems.length > 0 && (
                  <span className='badge'>{cartItems.length}</span>
                )}
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id='menu-list-grow'
                          onKeyDown={handleListKeyDown}>
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
                          <MenuItem onClick={(handleClose, signoutHandler)}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              {userInfo ? (
                <Button
                  ref={anchorRef}
                  color='inherit'
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}>
                  {userInfo.name} <i className='fa fa-caret-down'></i>
                </Button>
              ) : (
                <Button color='inherit' component={Link} to='/signin'>
                  Sign In
                </Button>
              )}
              {userInfo && userInfo.isAdmin && (
                <Button
                  ref={anchorRef}
                  color='inherit'
                  aria-controls={open ? 'admin-menu' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}>
                  Admin<i className='fa fa-caret-down'></i>
                </Button>
              )}
            </div>
            <IconButton color='inherit' onClick={openMenu}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {mobileMenu}
      </div>
    </Fragment>
  );
}
