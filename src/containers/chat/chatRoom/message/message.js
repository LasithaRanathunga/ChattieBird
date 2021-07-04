import React from 'react';
import {auth} from '../../../../firebase';

import classes from './message.module.scss';

const message = (props) => {
  const user = auth.currentUser.uid;
  let msg = null;
  if ((user !== props.data.uid) && !props.data.sameUser) {
    msg = (
      <div className={classes.Receive}>
      <img src={props.data.url} alt="dp"/>
      <p>{props.data.text}</p>
    </div>
    );
  } else if ((user !== props.data.uid) && props.data.sameUser) {
    msg = (
      <div className={classes.Receive_Same}>
      <img src={props.data.url} alt="dp"/>
      <p>{props.data.text}</p>
    </div>
    );
  } else if ((user === props.data.uid) && !props.data.sameUser) {
    msg = (
      <div className={classes.Send}>
      <p>{props.data.text}</p>
      <img src={props.data.url} alt="dp"/>
    </div>
    );
  } else if ((user === props.data.uid) && props.data.sameUser) {
    msg = (
      <div className={classes.Send_Same}>
      <p>{props.data.text}</p>
      <img src={props.data.url} alt="dp"/>
    </div>
    );
  }

  return msg
}

export default message;