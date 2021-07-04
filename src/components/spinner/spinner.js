import React from 'react';
import spinner from '../../assets/spinner.gif';
import classes from './spinner.module.scss';

const loading = () => (
  <div className={classes.Loading}>
    <img src={spinner} alt="spinner" />
    <span>LOADING . . .</span>
  </div>
)

export default loading;