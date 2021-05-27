import { useState } from 'react';
import Head from 'next/head';
import { majorScale, Pane, Dialog, Text, Heading } from 'evergreen-ui';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import Container from '../../components/container';
import Bookdetail from '../../components/bookdetail';
import ReviewInput from '../../components/reviewInput';
import Review from '../../components/review';

import { Book, Review as ReviewType, UserSession } from '../../types';
import { nanoid } from 'nanoid';
import { connectToDB } from '../../db';
import { getReviewsByBookId } from '../../db/review';
import { getBookById } from '../../db/books';

const BookDetailPage = (props: {
  id: string;
  reviews: ReviewType[];
  book: Book;
}) => {
  const [allBookReviews, setAllBookReviews] = useState<ReviewType[]>(
    props.reviews
  );
  const router = useRouter();
  const [session, loading] = useSession();
  const [isDiagolShown, setIsDiagolShown] = useState(false);
  const [newReview, setNewReview] = useState('');

  const onReviewSubmit = async () => {
    if (session) {
      const newData: ReviewType = {
        _id: nanoid(),
        forBookId: props.id,
        reviwerId: (session.user as UserSession).id,
        reviwer: session.user.name,
        date: new Date().toString(),
        review: newReview,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/book/review`,
        {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = await res.json();
      setAllBookReviews((prev) => [...prev, data]);
    } else {
      setIsDiagolShown(true);
    }
  };

  const handleReviewInput = (value: string) => {
    setNewReview(value);
  };

  return (
    <>
      <Head>
        <title>{`Read & Code Book | ${props.book.title}`}</title>
        <meta name="description" content={props.book.shortDescription} />
      </Head>
      <Dialog
        isShown={isDiagolShown}
        title="Session expired"
        confirmLabel="Ok"
        hasCancel={false}
        hasClose={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onConfirm={() => {
          router.push({
            pathname: '/signin',
            query: { return: `/books/${props.book._id}` },
          });
        }}
      >
        Sign in to continue
      </Dialog>
      <Container
        display="flex"
        flexDirection="row"
        height="100vh"
        padding={majorScale(1)}
      >
        <Pane width="60%" marginRight={majorScale(2)}>
          <Bookdetail book={props.book} />
          <ReviewInput
            onSubmit={onReviewSubmit}
            value={newReview}
            handleInput={handleReviewInput}
            signedIn={session ? true : false}
          />
        </Pane>
        <Pane
          width="35%"
          padding={majorScale(2)}
          overflow="scroll"
          height="90vh"
        >
          <Heading size={600}>Reviews</Heading>
          {allBookReviews.length ? (
            allBookReviews.map((r) => <Review key={r._id} review={r} />)
          ) : (
            <Text size={400} color="muted">
              No Reviews!
            </Text>
          )}
        </Pane>
      </Container>
    </>
  );
};

/*
  Since i need to get reviews from database, which will be dynamic and not created at
  build time so the db has to be quired each time page is visited. For this purpose using 
  getServerSideProps
*/

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const { db } = await connectToDB();
  const bookReview = await getReviewsByBookId(db, ctx.params.id);
  const book = await getBookById(db, ctx.params.id);

  return {
    props: {
      session,
      id: ctx.params.id,
      reviews: bookReview,
      book,
    },
  };
}

export default BookDetailPage;
