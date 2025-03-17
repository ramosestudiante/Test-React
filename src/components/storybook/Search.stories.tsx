// src/components/Search.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Search from '../Search';
import { Book } from '../../redux/books/types';

// props search
interface SearchProps {
  onSelect: (book: Book) => void;
  fetchBooks: (query: string) => void;
}

export default {
  title: 'Components/Search',
  component: Search,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>],
} as Meta;

const Template: StoryFn<SearchProps> = (args: SearchProps) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: (book: Book) => console.log('Selected book:', book),
  fetchBooks: (query: string) => console.log('Fetch books with query:', query),
};
