import { Heading, majorScale, Pane, Paragraph, Text } from 'evergreen-ui';
import { Book } from '../types';

const Bookdetail = ({ book }: { book: Book }) => {
  return (
    <Pane padding={majorScale(1)}>
      <Pane display="flex" flexDirection="row" margin={majorScale(1)}>
        <Pane>
          <img
            src={book.thumbnailUrl}
            alt="book img"
            height="170px"
            width="130px"
          />
        </Pane>
        <Pane marginLeft={majorScale(2)}>
          <Heading size={800} marginBottom={majorScale(1)}>
            {book.title}
          </Heading>
          <Text size={300} color="muted" marginBottom={majorScale(2)}>
            {new Date(book.publishedDate).toLocaleDateString()}
          </Text>
          <Heading size={500}>{book.authors.split(', ').join(' | ')}</Heading>
          <Heading size={400}>
            {book.categories.split(', ').join(' | ')}
          </Heading>
        </Pane>
      </Pane>
      <Pane>
        <Paragraph marginTop={majorScale(1)} overflow="scroll" height="180px">
          {book.longDescription}
        </Paragraph>
      </Pane>
    </Pane>
  );
};

export default Bookdetail;
