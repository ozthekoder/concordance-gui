import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from '../actions/Home';
import * as actions from '../actions/header';
import HeaderComponent from '../components/Header';

export const HeaderContainer = (props) => {
  return (
    <HeaderComponent
    readFile={props.actions.readFile}
    file={props.file}
    />
  );
};

HeaderContainer.propTypes = {
  dictionary: PropTypes.object,
  contents: PropTypes.array,
  lines: PropTypes.array
};

function mapStateToProps(state) {
  const { file } = state.headerReducer;
  return {
    file
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
)(HeaderContainer);
