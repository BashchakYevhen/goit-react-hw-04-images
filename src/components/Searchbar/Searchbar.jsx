import { CgSearch } from 'react-icons/cg';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.style';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchHeader>
      <SearchForm onSubmit={onSubmit}>
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
