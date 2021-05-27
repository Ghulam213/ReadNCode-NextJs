import React, { useState } from 'react';
import { createFilter } from 'react-search-input';
import Head from 'next/head';

import { majorScale, Pane } from 'evergreen-ui';

import Bookcard from '../../components/bookcard';
import Container from '../../components/container';
import Search from '../../components/search';

import { Book } from '../../types';
import { getBooks } from '../../db/books';
import { connectToDB } from '../../db';

const KEYS_TO_FILTER = [
  'title',
  'publishedDate.$date',
  'shortDescription',
  'longDescription',
  'authors',
  'categories',
];

const Books = ({ books }: { books: Book[] }) => {
  const [searchParam, setSearchParam] = useState('');

  const filterBooks = (): Book[] =>
    books.filter(createFilter(searchParam, KEYS_TO_FILTER));

  return (
    <>
      <Head>
        <title>{'Read & Code | Books'}</title>
        <meta
          name="description"
          content="Page for all avilable books with filter"
        />
      </Head>
      <Container>
        <Search
          handleInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchParam(e.target.value);
          }}
          value={searchParam}
          placeholder="Search with title, author, category, pushlished date or other keywords..."
          width="100%"
          height={40}
        />
        <hr />
        <Pane
          display="flex"
          flexFlow="row wrap"
          justifyContent="center"
          width="100%"
          marginTop={majorScale(2)}
        >
          {filterBooks().map((b) => {
            return <Bookcard key={b.isbn} book={b} />;
          })}
        </Pane>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const { db } = await connectToDB();
  const books = await getBooks(db);

  return {
    props: {
      books: books,
    },
  };
}

export default Books;
