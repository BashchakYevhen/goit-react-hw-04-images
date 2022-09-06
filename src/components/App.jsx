import { useState, useEffect } from 'react';
import { GlobalStyle } from 'globalStyle';
import { Barstyle } from './App.style';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from './LoadMore/LoadMore';
import { Modal } from './Modal/Modal';
import { updateFetch } from '../service/fetch';

export const App = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [q, setq] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [totalArticles, setTotalArticles] = useState(null);
  useEffect(() => {
    if (q === '') {
      return;
    }
    updateFetch(q, page)
      .then(response => {
        const nextArticles = response.data.hits;
        setIsLoading(false);
        setTotalArticles(response.data.total);
        setArticles(prevState => [...prevState, ...nextArticles]);
      })
      .catch(error => setErrors(error));
  }, [page, q]);

  const onSubmit = search => {
    setq(search);
    setPage(1);
    setArticles([]);
  };
  const onLoadMore = e => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };
  const dataForModal = (tags, largeImageURL) => {
    setCurrentArticle({ tags, largeImageURL });
  };
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <Barstyle>
      <Searchbar onSubmit={onSubmit} />
      {articles.length > 0 && (
        <>
          <ImageGallery errors={errors}>
            <ImageGalleryItem
              articles={articles}
              toggleModal={toggleModal}
              dataForModal={dataForModal}
            />
          </ImageGallery>
          {totalArticles > articles.length && totalArticles > 20 && (
            <LoadMore onClick={onLoadMore} isLoading={isLoading} />
          )}
        </>
      )}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={currentArticle.largeImageURL} alt={currentArticle.tags} />
        </Modal>
      )}
      <GlobalStyle />
    </Barstyle>
  );
};
