import { PropTypes } from 'prop-types';
import { CgSearch } from 'react-icons/cg';
import { Notify } from 'notiflix';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.style';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.input.value.trim();
    if (search.length !== 0) {
      onSubmit(search);
    }

    if (search.length === 0) {
      Notify.warning('Your query is empty!');
    }
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <CgSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
