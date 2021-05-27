import { Pane, SearchInput, majorScale, Text } from 'evergreen-ui';

const Search = ({ handleInput, value, ...styles }) => {
  return (
    <Pane margin={majorScale(3)} textAlign="center">
      <SearchInput onChange={handleInput} value={value} {...styles} />
      <Text color="muted" marginTop={majorScale(2)}>
        For filtering using multiple properties, just type them with space.
      </Text>
    </Pane>
  );
};

export default Search;
