import { GalleryList } from './ImageGallery.style';

export const ImageGallery = ({ children, isLoading, errors }) => {
  if (errors) {
  }

  return <GalleryList>{children}</GalleryList>;
};
