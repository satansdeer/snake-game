"use strict";
const React = require("react");
const { Text, Color, Box } = require("ink");

const FIELD_SIZE = 32;

const limitByField = x => {
  if (x >= FIELD_SIZE) {
    return 0;
  }
  if (x < 0) {
    return FIELD_SIZE;
  }
  return x;
};

const getItem = (x, y, snakeSegments) => {
  if (x === 5 && y === 6) {
    return <Color red></Color>;
  }

  for (const segment of snakeSegments) {
    if (segment.x === x && segment.y === y) {
      return <Color green>■</Color>;
    }
  }
};

const App = () => {
  const [snakeSegments, setSnakeSegments] = React.useState([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 6 }
  ]);

  React.useEffect(() => {
    setInterval(() => {
      setSnakeSegments(segments =>
        segments.map(segment => ({
          ...segment,
          y: limitByField(segment.y + 1)
        }))
      );
    }, 200);
  }, []);

  return (
    <Box flexDirection="column" alignItems="center">
      <Text>
        <Color green>Snake</Color> game
      </Text>
      <Box flexDirection="column">
        {[...new Array(32).keys()].map(y => (
          <Box key={y}>
            {[...new Array(32).keys()].map(x => (
              <Box key={x}>{getItem(x, y, snakeSegments) || "."}</Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

module.exports = App;
