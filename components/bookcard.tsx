import Link from 'next/link';
import {
  Pane,
  Heading,
  Paragraph,
  Button,
  majorScale,
  Card,
} from 'evergreen-ui';
import { Book } from '../types';

const Bookcard = ({ book }: { book: Book }) => {
  return (
    <Card
      width="300px"
      padding={majorScale(2)}
      border
      borderRadius={4}
      elevation={2}
      overflow="hidden"
      margin={majorScale(1)}
    >
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={majorScale(2)}
      >
        <img
          src={book.thumbnailUrl}
          alt="book img"
          height="150px"
          width="100px"
        />
      </Pane>
      <Pane>
        <Heading size={600} marginBottom={majorScale(1)}>
          {book.title}
        </Heading>
        <Pane>
          <Paragraph>
            <strong>Published</strong>:{' '}
            {new Date(book.publishedDate).toLocaleDateString()}
          </Paragraph>
          <Paragraph>
            <strong>Authors</strong>: {book.authors.split(', ').join(' | ')}
          </Paragraph>
          <Paragraph>
            <strong>Category</strong>: {book.categories.split(', ').join(' | ')}
          </Paragraph>
        </Pane>
        <Paragraph className="ellipsis" marginTop={majorScale(1)}>
          {book.shortDescription}
        </Paragraph>
      </Pane>
      <Link href={`/books/${book._id}`}>
        <a>
          <Button
            appearance="primary"
            intent="success"
            height={32}
            marginTop="default"
            float="right"
          >
            Read
          </Button>
        </a>
      </Link>
    </Card>
  );
};

export default Bookcard;
