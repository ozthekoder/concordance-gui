import React from 'react';
import Header from '../../components/Header';
import classes from './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className="wrapper">
    <Header />
    <div className={classes.page}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
