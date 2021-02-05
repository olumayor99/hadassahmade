import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { signout } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

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
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          color='primary'
          component={Link}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}>
          <AccountCircleOutlinedIcon fontSize='large' />
          <i className='fa fa-caret-down'></i>
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
                    {userInfo ? (
                      <div>
                        {userInfo.isAdmin && (
                          <div>
                            <MenuItem
                              onClick={handleClose}
                              color='inherit'
                              component={Link}
                              to='/dashboard'>
                              <Typography variant='h6'>Dashboard</Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}
                              color='inherit'
                              component={Link}
                              to='/productlist'>
                              <Typography variant='h6'>Products</Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}
                              color='inherit'
                              component={Link}
                              to='/orderlist'>
                              <Typography variant='h6'>Orders</Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}
                              color='inherit'
                              component={Link}
                              to='/userlist'>
                              <Typography variant='h6'>Users</Typography>
                            </MenuItem>
                          </div>
                        )}
                        <MenuItem
                          onClick={handleClose}
                          color='inherit'
                          component={Link}
                          to='/profile'>
                          <Typography variant='h6'>Profile</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={handleClose}
                          color='inherit'
                          component={Link}
                          to='/orderhistory'>
                          <Typography variant='h6'>Order History</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={signoutHandler}
                          color='inherit'
                          component={Link}
                          to='/'>
                          <Typography variant='h6'>Logout</Typography>
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
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
