"use strict";
const React = require("react");
const {useEffect, useState, useRef, useContext} = require("react");
const { Text, Color, Box, StdinContext } = require("ink");

function useInterval(callback, delay) {
	const savedCallback = useRef();
  
	useEffect(() => {
	  savedCallback.current = callback;
	}, [callback]);
  
	// Set up the interval.
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
	  if (delay !== null) {
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	  }
	}, [delay]);
  }

const FIELD_SIZE = 32;

const ARROW_UP = "\u001B[A";
const ARROW_DOWN = "\u001B[B";
const ARROW_LEFT = "\u001B[D";
const ARROW_RIGHT = "\u001B[C";

const DIRECTION = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  TOP: { x: 0, y: -1 },
  BOTTOM: { x: 0, y: 1 }
};

const limitByField = x => {
  if (x >= FIELD_SIZE) {
    return 0;
  }
  if (x < 0) {
    return FIELD_SIZE - 1;
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
  const [direction, setDirection] = useState(DIRECTION.LEFT);
  const { stdin, setRawMode } = useContext(StdinContext);

  const [snakeSegments, setSnakeSegments] = useState([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 6 }
  ]);

  React.useEffect(() => {
	setRawMode(true);
    stdin.on("data", data => {
      const value = data.toString();
      if (value == ARROW_UP) {
        setDirection(DIRECTION.TOP);
      }
      if (value == ARROW_DOWN) {
        setDirection(DIRECTION.BOTTOM);
      }
      if (value == ARROW_LEFT) {
        setDirection(DIRECTION.LEFT);
      }
      if (value == ARROW_RIGHT) {
        setDirection(DIRECTION.RIGHT);
      }
    });
  }, []);

    useInterval(() => {
      setSnakeSegments(segments =>
        segments.map(segment => ({
          x: limitByField(segment.x + direction.x),
          y: limitByField(segment.y + direction.y)
        }))
      );
    }, 200);

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
