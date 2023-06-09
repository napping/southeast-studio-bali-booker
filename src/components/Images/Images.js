import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Snackbar, Slide } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import Image from './Image'
import NoImagesMessage from './NoImagesMessage'
import Pagination from './Pagination'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '3% 4%',
  }
}

@inject('imagesStore')
@observer
class Images extends Component {
  constructor() {
    super()
    this.state = {
      isSnackbarOpen: false,
    }
  }

  saveToFavorites = image => {
    const favorites = toJS(this.props.imagesStore.favorites)
    const favorite = favorites[image.id]

    if (!favorite) {
      this.props.imagesStore.saveToFavorites(image)
    } else {
      this.setState({ isSnackbarOpen: true })
    }
  }

  handleClose = () => {
    this.setState({ isSnackbarOpen: false })
  }

   render() {
    const { classes, imagesStore } = this.props
    const images = toJS(imagesStore.images)
    const favorites = toJS(imagesStore.favorites)
    const { isSnackbarOpen } = this.state

    return (
      <div className={classes.container}>
        {imagesStore.noResults ? (
          <NoImagesMessage />
        ) : (
          <div className={classes.images}>
            {images.map(image => (
              <Image
                key={image.id}
                image={image}
                saveToFavorites={this.saveToFavorites}
                isFavorite={!!favorites[image.id]}
              />
            ))}
          </div>
        )}

        {images.length ? <Pagination /> : ''}
        
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackbarOpen}
          autoHideDuration={2000}
          onClose={this.handleClose}
          TransitionComponent={Slide}
          message={<span>Service already added to cart</span>}
        />
      </div>
    )
  }
}
export default withStyles(styles)(Images)
