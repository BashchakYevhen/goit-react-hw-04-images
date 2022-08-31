import { Component } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Notify } from 'notiflix';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.style';

export class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.input.value.trim();
    if (search.length !== 0) {
      this.props.onSubmit(search);
    }

    if (search.length === 0) {
      Notify.warning('Your query is empty!');
    }
  };
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
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
  }
}
