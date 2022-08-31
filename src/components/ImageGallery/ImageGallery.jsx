import { GalleryList } from './ImageGallery.style';

export const ImageGallery = ({ children, errors }) => {
  if (errors) {
  }

  return <GalleryList>{children}</GalleryList>;
};
