import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.style';
export const ImageGalleryItem = ({ articles, toggleModal, dataForModal }) => {
  return articles.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <GalleryItem key={id}>
        <GalleryItemImg
          src={webformatURL}
          alt={tags}
          onClick={() => {
            dataForModal(tags, largeImageURL);
            toggleModal();
          }}
        />
      </GalleryItem>
    );
  });
};
