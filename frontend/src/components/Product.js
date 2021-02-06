import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: '50vh',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
}));

export default function Product(props) {
  const { product } = props;

  const classes = useStyles();

  const [isShown, setIsShown] = useState(true);

  return (
    <Grid item key={product._id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          onMouseEnter={() => setIsShown(false)}
          onMouseLeave={() => setIsShown(true)}
          className={classes.cardMedia}
          image={
            isShown
              ? product.image
              : 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          }
          title={product.name}
          component={Link}
          to={`/product/${product._id}`}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5'>
            {product.name}
          </Typography>
          <Typography variant='h5'>€{product.price}</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Grid>
  );
}
