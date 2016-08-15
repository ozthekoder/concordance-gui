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
  file: PropTypes.object,
  contents: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    contents: state.homeReducer.contents
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
