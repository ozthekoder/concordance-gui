import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/Home';
import * as actions from '../actions/home';
import HomeComponent from '../components/Home';

export const HomeContainer = (props) => {
  return (
    <HomeComponent
    readFile={props.actions.readFile}
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
  console.log(state.homeReducer)
  window.oz = state.homeReducer;
  const { contents, dictionary, lines } = state.homeReducer;
  return {
    contents,
    dictionary,
    lines
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
