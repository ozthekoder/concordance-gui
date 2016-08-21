import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../components/Home';


export const HomeContainer = (props) => {
  return (
    <HomeComponent
    contents={props.contents}
    concordance={props.concordance}
    />
  );
};

HomeContainer.propTypes = {
  dictionary: PropTypes.object,
  contents: PropTypes.array,
  concordance: PropTypes.array
};

function mapStateToProps(state) {
  const { contents, dictionary, concordance } = state.homeReducer;
  return {
    contents,
    dictionary,
    concordance
  };
}

export default connect(
  mapStateToProps
)(HomeContainer);
