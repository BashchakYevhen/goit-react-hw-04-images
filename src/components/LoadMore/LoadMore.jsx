import { PropTypes } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { LoadMoreButton } from './LoadMore.style';

export const LoadMore = ({ onClick, isLoading }) => {
  if (isLoading) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <>
      <LoadMoreButton type="button" onClick={onClick}>
        LoadMore
      </LoadMoreButton>
    </>
  );
};
LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
