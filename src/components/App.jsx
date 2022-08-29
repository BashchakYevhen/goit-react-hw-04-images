import { Component } from 'react';
import { GlobalStyle } from 'globalStyle';
import { Barstyle } from './App.style';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from './LoadMore/LoadMore';
import { Modal } from './Modal/Modal';
import { baseFetch, updateFetch } from 'Service/Fetch';
export class App extends Component {
  state = {
    page: 1,
    articles: [],
    q: '',
    showModal: false,
    currentArticle: {},
  };
  componentDidMount() {
    baseFetch().then(response => {
      this.setState({ articles: response.data.hits });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      updateFetch(q, page).then(response => {
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
  dataForModal = (tags, largeImageURL) => {
    this.setState({ currentArticle: { tags, largeImageURL } });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log(this.state.showModal);
  };
  render() {
    const { articles, showModal, currentArticle } = this.state;
    return (
      <Barstyle>
        <Searchbar onSubmit={this.onSubmit} />
        {articles.length > 0 && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                articles={articles}
                toggleModal={this.toggleModal}
                dataForModal={this.dataForModal}
              />
            </ImageGallery>
            <LoadMore onClick={this.onLoadMore} />
          </>
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={currentArticle.largeImageURL} alt={currentArticle.tags} />
          </Modal>
        )}
        <GlobalStyle />
      </Barstyle>
    );
  }
}
