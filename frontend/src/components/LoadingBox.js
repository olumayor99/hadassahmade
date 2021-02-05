import '../App.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function LoadingBox() {
  const classes = useStyles();
  return (
    <div className='App'>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
