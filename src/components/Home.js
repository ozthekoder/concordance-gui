import React, { PropTypes } from 'react';

const HomePage = (props) => {
  return (
    <div className="home-page">
    <label htmlFor="fileinput">
      <input onChange={props.readFile} name="fileinput" type="file" id="fileinput" />
      Docx Yukle
    </label>
    <div>
      {props.contents}
    </div>
    </div>
  );
};

HomePage.PropTypes = {
  readFile: PropTypes.func,
  contents: PropTypes.array
};
export default HomePage;
