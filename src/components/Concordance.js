import React, { PropTypes } from 'react';

const Concordance = (props) => {
  const { word, lines } = props;
  console.log(word)
  console.log(lines)

  const usage = lines.map((line) => <p>{line.split(word).reduce((prev, next) => <span>{prev}<b> {word} </b>{next}</span>)}</p>)
  return (
    <div className="concordance">
      <h3>{word}</h3>
      {usage}
    </div>
  );
};

Concordance.PropTypes = {
  word: PropTypes.string,
  lines: PropTypes.array
};
export default Concordance;
