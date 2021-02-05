import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import logo from '../images/logo.png';
import Drawer from '../layouts/drawer';
import Dropdown from '../layouts/Dropdown';
import { useSelector } from 'react-redux';

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
              <Dropdown />
            ) : (
              <Button color='primary' component={Link} to='/signin'>
                <PersonAddOutlinedIcon fontSize='large' />
              </Button>
            )}
          </div>
          <div className={classes.menuButton}>
            <Drawer />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
