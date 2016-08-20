import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../components/Home';

export const HomeContainer = (props) => {
  return (
    <HomeComponent
    contents={props.contents}
    />
  );
};

HomeContainer.propTypes = {
  dictionary: PropTypes.object,
  contents: PropTypes.array,
  lines: PropTypes.array
};

function mapStateToProps(state) {
  const { contents, dictionary, lines } = state.homeReducer;
  return {
    contents,
    dictionary,
    lines
  };
}

export default connect(
  mapStateToProps
)(HomeContainer);
