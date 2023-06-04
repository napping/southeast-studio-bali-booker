import { observable, action, computed } from 'mobx'
import axios from 'axios'

import img1 from "./serviceImages/img1.jpeg";
import img2 from "./serviceImages/img2.jpeg";
import img3 from "./serviceImages/img3.jpeg";
import img4 from "./serviceImages/img4.jpeg";
import img5 from "./serviceImages/img5.jpeg";

export class ImagesStore {
  @observable images = [
    { id: 'img1', largeImageURL: img1 },
    { id: 'img2', largeImageURL: img2 },
    { id: 'img3', largeImageURL: img3 },
    { id: 'img4', largeImageURL: img4 },
    { id: 'img5', largeImageURL: img5 },
  ];
  @observable favorites = {}
  @observable totalPagesAmount
  @observable noResults
  @observable pageNum = 1
  @observable query

  constructor() {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      this.favorites = JSON.parse(favorites)
    }
  }

  @action goToPage = num => {
    if (num !== this.pageNum && num >= 1 && num <= this.totalPagesAmount) {
      this.pageNum = num
      this.callApi()
    }
  }

  async callApi() {
    /*
    const perPage = 52
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${this.query}&per_page=${perPage}&page=${this.pageNum}&image_type="vector"`
    )

    const { totalHits, hits } = response.data
    this.totalPagesAmount = Math.ceil(totalHits / perPage)
    this.noResults = hits.length === 0
    */
    this.images = [{id: 'test1', largeImageURL: img1}]
  }

  @action loadImages = async query => {
    this.query = query
    this.pageNum = 1
    await this.callApi()
  }

  @computed get favoritesToArray() {
    return Object.values(this.favorites)
  }

  @computed get favoritesLength() {
    return this.favoritesToArray.length
  }

  saveFavoritesToLocalStroage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  @action saveToFavorites = image => {
    const savedImage = {
      id: image.id,
      imageURL: image.largeImageURL,
      description: image.tags,
    }
    this.favorites[image.id] = savedImage
    this.saveFavoritesToLocalStroage()
  }

  @action removeFavorite = favoriteId => {
    delete this.favorites[favoriteId]
    this.saveFavoritesToLocalStroage()
  }

  @action editFavorite = (favoriteId, description) => {
    this.favorites[favoriteId] = { ...this.favorites[favoriteId], description }
    this.saveFavoritesToLocalStroage()
  }
}
