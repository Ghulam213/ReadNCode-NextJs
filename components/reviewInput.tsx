import { Pane, TextareaField, Button, majorScale } from 'evergreen-ui';
import React from 'react';

interface IProps {
  onSubmit: () => void;
  handleInput: (value: string) => void;
  value: string;
  signedIn: boolean;
}

const ReviewInput = ({ onSubmit, handleInput, value, signedIn }: IProps) => {
  return (
    <Pane padding={majorScale(1)}>
      <TextareaField
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleInput(e.target.value)
        }
        value={value}
        label="Review of the Book"
        description="Give your review of the book!"
        hint={
          signedIn
            ? 'Your review will help others decide!'
            : 'You are not signed in! Sign in to give review.'
        }
      />
      <Button
        appearance="primary"
        intent="success"
        float="right"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Pane>
  );
};

export default ReviewInput;
