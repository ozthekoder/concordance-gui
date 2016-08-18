import React, { PropTypes } from 'react';

const HomePage = (props) => {
  return (
    <div className="home-page">
    <div className="toolbox">
    <div className="clearfix">
    <div className="column">
    <label htmlFor="fileinput">
      <input onChange={props.readFile} name="fileinput" type="file" id="fileinput" />
      Docx Yukle
    </label>
    </div>
    <div className="column">
    <input type="text" value="" id="search" name="search"/>
    </div>
    </div>
    </div>
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
