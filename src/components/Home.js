import React, { PropTypes } from 'react';
import Concordance from './Concordance'
const HomePage = (props) => {
  return (
    <div className="home-page">
    <div className="clearfix">
    <div className="column">
      {props.contents}
    </div>
    <div className="column">
      {props.concordance.map((props, index) => <Concordance key={index} {...props} />)}
    </div>
    </div>
    </div>
  );
};

HomePage.PropTypes = {
  contents: PropTypes.array,
  dictionary: PropTypes.object,
  concordance: PropTypes.array
};
export default HomePage;
