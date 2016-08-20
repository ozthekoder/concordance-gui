import React, { PropTypes } from 'react';
import Header from '../containers/HeaderContainer';
const App = (props) => {
  return (
    <div className="container">
      <Header />
      <div className="page">
      {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
