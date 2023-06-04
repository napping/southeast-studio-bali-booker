import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
// import HeartIcon from '@material-ui/icons/FavoriteBorder'
import AddIcon from '@material-ui/icons/Add'
import { Fab } from '@material-ui/core'

const styles = theme => ({
  image: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '25vh',
    height: '25vh',
    margin: '1.5%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '1%',
  },
  button: {
    margin: '5%',
    backgroundColor: 'rgba(247, 248, 250, 0.7)',
  },
  iconFilled: {
    color: theme.palette.secondary.main,
  },
})

class Image extends Component {
  render() {
    const { classes, image, saveToFavorites, isFavorite } = this.props

    if (!image) {
      return
    }

    return (
      <div
        className={classes.image}
        style={{ backgroundImage: `url('${image.largeImageURL}')` }}
      >
        <Fab
          size='small'
          classes={{ root: classes.button }}
          onClick={() => saveToFavorites(image)}
        >
          {isFavorite ? <AddIcon className={classes.iconFilled} /> : <AddIcon />}
        </Fab>
      </div>
    )
  }
}

export default withStyles(styles)(Image)
