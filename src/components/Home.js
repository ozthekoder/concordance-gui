import React, { PropTypes } from 'react';

const HomePage = (props) => {
  return (
    <div className="home-page">
    <div className="clearfix">
    <div className="column">
      {props.contents}
    </div>
    <div className="column">
    </div>
    </div>
    </div>
  );
};

HomePage.PropTypes = {
  readFile: PropTypes.func,
  contents: PropTypes.array,
  lines: PropTypes.array,
  dictionary: PropTypes.object
};
export default HomePage;
