import { Component } from 'react';
import { Notify } from 'notiflix';
import { GlobalStyle } from 'globalStyle';
import { Barstyle } from './App.style';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from './LoadMore/LoadMore';
import { Modal } from './Modal/Modal';
import { updateFetch } from 'Service/Fetch';
export class App extends Component {
  state = {
    page: 1,
    articles: [],
    q: '',
    showModal: false,
    currentArticle: {},
    isLoading: false,
    errors: null,
    totalArticles: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      updateFetch(q, page)
        .then(response => {
          const prevArticles = this.state.articles;
          const nextArticles = response.data.hits;
          const allArticles = response.data.total;
          this.setState({
            totalArticles: allArticles,
            isLoading: false,
            articles: [...prevArticles, ...nextArticles],
          });
          console.log(
            'total:',
            response.data.total,
            'state:',
            this.state.articles.length
          );
        })
        .catch(error => this.setState({ errors: error }));
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.input.value.trim();
    if (search.length !== 0) {
      this.setState({
        q: search,
        page: 1,
        articles: [],
      });
    }
    if (search.length === 0) {
      Notify.warning('Your query is empty!');
    }
  };
  onLoadMore = e => {
    e.preventDefault();
    this.setState(state => ({
      page: state.page + 1,
      isLoading: true,
    }));
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
    const {
      articles,
      showModal,
      currentArticle,
      isLoading,
      errors,
      totalArticles,
    } = this.state;
    return (
      <Barstyle>
        <Searchbar onSubmit={this.onSubmit} />
        {articles.length > 0 && (
          <>
            <ImageGallery isLoading={isLoading} errors={errors}>
              <ImageGalleryItem
                articles={articles}
                toggleModal={this.toggleModal}
                dataForModal={this.dataForModal}
              />
            </ImageGallery>
            {totalArticles > articles.length && totalArticles > 20 && (
              <LoadMore onClick={this.onLoadMore} isLoading={isLoading} />
            )}
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
