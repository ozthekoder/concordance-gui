import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';

export const Header = () => (
  <div className={classes.header}>
  <h1 className={classes.logo}>Kelime Dizin</h1>
  <div className={classes.actions}>
  <label for="fileinput"><input name="fileinput" type="file" id="fileinput" />Docx Yukle</label>
  </div>
  </div>
);

export default Header;
