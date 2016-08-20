import React from 'react';
import Logo from './Logo';

const HeaderComponent = (props) => {
  const { file } = props;
  const controls = file ? (
    <div>
    <input className="error" type="text" value="" id="search" name="search" placeholder="Dizinde Ara..." />
    <label htmlFor="fileinput" className="button">
      <input onChange={props.readFile} name="fileinput" type="file" id="fileinput" />
      Yeni Yukle
    </label>
    <button>Dizini Indir</button>
    </div>
  ) : (
    <label htmlFor="fileinput" className="button">
      <input onChange={props.readFile} name="fileinput" type="file" id="fileinput" />
      Docx Yukle
    </label>
  );
  return (
    <div className="header">
    <Logo />
    { controls }
    </div>
  );
};

export default HeaderComponent;
