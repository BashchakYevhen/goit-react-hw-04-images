import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.style';

export const ImageGalleryItem = ({ articles }) => {
  return articles.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <GalleryItem key={id}>
        <a href={largeImageURL}>
          <GalleryItemImg src={webformatURL} alt={tags} />
        </a>
      </GalleryItem>
    );
  });
};
