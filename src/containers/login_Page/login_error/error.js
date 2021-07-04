import React from 'react';

import classes from './error.module.scss';

const Error = (props) => {
  return (
    <div className={classes.Error}>
      <div className={classes.Message}>
        <h2>Something wrong !</h2>
        <p>{props.message}</p>
        <button onClick={props.close} className={'btn-primary'} style={{width: '12rem'}}>Got it</button>
      </div>
    </div>
  )
}

export default Error;