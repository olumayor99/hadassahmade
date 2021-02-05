import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';

const useStyles = makeStyles({
  list: {
    width: 150,
  },
  fullList: {
    width: 150,
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '1.0rem',
  },
}))(Badge);

export default function Drawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    function handleResize() {
      window.innerWidth > 959 && setState(false);
    }

    window.addEventListener('resize', handleResize);
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <HomeOutlinedIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to='/cart'>
          <ListItemIcon>
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
          </ListItemIcon>
          <ListItemText primary='Cart' />
        </ListItem>
      </List>

      {userInfo ? (
        <div>
          {userInfo.isAdmin && (
            <div>
              <Divider />
              <List>
                <ListItem button component={Link} to='/dashboard'>
                  <ListItemIcon>
                    <DashboardOutlinedIcon fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button component={Link} to='/productlist'>
                  <ListItemIcon>
                    <ShoppingBasketOutlinedIcon fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Products' />
                </ListItem>
                <ListItem button component={Link} to='/orderlist'>
                  <ListItemIcon>
                    <LocalMallOutlinedIcon fontSize='Orders' />
                  </ListItemIcon>
                  <ListItemText primary='Orders' />
                </ListItem>
                <ListItem button component={Link} to='/userlist'>
                  <ListItemIcon>
                    <PeopleAltOutlinedIcon fontSize='large' />
                  </ListItemIcon>
                  <ListItemText primary='Users' />
                </ListItem>
              </List>
            </div>
          )}
          <Divider />
          <List>
            <ListItem button component={Link} to='/profile'>
              <ListItemIcon>
                <AccountCircleOutlinedIcon fontSize='large' />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
            <ListItem
              button
              onClick={signoutHandler}
              color='inherit'
              component={Link}
              to='/'>
              <ListItemIcon>
                <ExitToAppOutlinedIcon fontSize='large' />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
          <Divider />
        </div>
      ) : (
        <div>
          <Divider />
          <List>
            <ListItem button component={Link} to='/signin'>
              <ListItemIcon>
                <PersonOutlinedIcon fontSize='large' />
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItem>
          </List>
          <Divider />
        </div>
      )}
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} color='primary'>
            <MenuIcon fontSize='large' />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
