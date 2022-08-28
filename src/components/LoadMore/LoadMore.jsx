import { LoadMoreButton } from './LoadMore.style';

export const LoadMore = ({ onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      LoadMore
    </LoadMoreButton>
  );
};
