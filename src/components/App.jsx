import { Component } from 'react';
import Axios from 'axios';
import { KEY, BASE_URL } from 'KEY';
import { GlobalStyle } from 'globalStyle';
import { Barstyle } from './App.style';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from './LoadMore/LoadMore';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    page: 1,
    articles: [],
    q: '',
  };
  componentDidMount() {
    Axios.get(`${BASE_URL}?key=${KEY}`).then(response => {
      this.setState({ articles: response.data.hits });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q || prevState.page !== this.state.page) {
      Axios.get(
        `${BASE_URL}?key=${KEY}&q=${this.state.q}&page=${this.state.page}`
      ).then(response => {
        const prevArticles = this.state.articles;
        const nextArticles = response.data.hits;
        this.setState({ articles: [...prevArticles, ...nextArticles] });
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      q: e.currentTarget.input.value,
      page: 1,
      articles: [],
    });
  };
  onLoadMore = e => {
    e.preventDefault();
    this.setState(state => ({ page: state.page + 1 }));
  };
  render() {
    const { articles } = this.state;
    return (
      <Barstyle>
        <Searchbar onSubmit={this.onSubmit} />
        {articles.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem articles={articles} />
          </ImageGallery>
        )}
        {articles.length > 0 && <LoadMore onClick={this.onLoadMore} />}
        <GlobalStyle />
        <Modal />
      </Barstyle>
    );
  }
}
