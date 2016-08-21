import React, { PropTypes } from 'react';

const Concordance = (props) => {
  const { word, lines, numbers } = props;
  const usage = lines.map((line, index) => <p key={index}>{line
  .split(word)
  .reduce((prev, next) => [...prev, ...next.split(word.substring(0,1).toUpperCase() + word.substring(1))], [])
  .reduce((prev, next) => <span>{prev}<b> {word} </b>{next}</span>)
}</p>);

  return (
    <div className="concordance">
      <h3>{word}&emsp;[{numbers.count}] ({(numbers.frequency * 100).toFixed(2)}%)</h3>
      {usage}
    </div>
  );
};

Concordance.PropTypes = {
  word: PropTypes.string,
  lines: PropTypes.array,
  numbers: PropTypes.object
};
export default Concordance;
