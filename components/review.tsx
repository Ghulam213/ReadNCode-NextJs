import {
  Pane,
  Avatar,
  Paragraph,
  Text,
  Heading,
  majorScale,
} from 'evergreen-ui';

import { Review as ReviewType } from '../types';

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <Pane
      display="flex"
      flexDirection="row"
      borderBottom
      padding={majorScale(1)}
      margin={majorScale(1)}
    >
      <Pane width="20%" textAlign="center" paddingTop={majorScale(1)}>
        <Avatar name={review.reviwer} size={40} />
      </Pane>
      <Pane paddingX={majorScale(1)}>
        <Pane>
          <Heading size={400}>{review.reviwer}</Heading>
          <Text size={300} color="muted" marginBottom={majorScale(2)}>
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </Pane>
        <Pane>
          <Paragraph marginBottom={majorScale(1)}>{review.review}</Paragraph>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Review;
