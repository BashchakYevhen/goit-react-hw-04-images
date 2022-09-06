import { PropTypes } from 'prop-types';
import { GalleryList } from './ImageGallery.style';

export const ImageGallery = ({ children, errors }) => {
  if (errors) {
  }

  return <GalleryList>{children}</GalleryList>;
};

ImageGallery.propType = {
  children: PropTypes.element.isRequired,
  errors: PropTypes.string.isRequired,
};
