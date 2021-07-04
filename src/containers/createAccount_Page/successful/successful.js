import React from 'react'

import img from '../../../assets/cheerful-businesspeople-laughing-waving-hands-up-office-workplace-employee-characters-rejoice-new-project-success-165549774.jpg';
import classes from './successful.module.scss';

const successful = (props) => (
  <div className={classes.Successful}>
    <div className={classes.Successful_Content}>
      <h2>Successfully signed in</h2>
      <img src={img} alt={'successful'} />
      <button onClick={() => {
        props.pushHistory('/chat');
        props.unmountSuccessPopup(false);
      }} className='btn-primary'>Continue</button>
    </div>
  </div>
)

export default successful;