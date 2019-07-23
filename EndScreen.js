"use strict";
const React = require("react");
const { Color, Box } = require("ink");

module.exports = ({size}) => (<Box
    flexDirection="column"
    height={size}
    width={size}
    alignItems="center"
    justifyContent="center"
  >
    <Color red>You died</Color>
  </Box>);
