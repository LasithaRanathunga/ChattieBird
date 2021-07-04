import React from 'react'

import classes from './deleteUser.module.scss';

const DeleteUser = (props) => {
  return (
    <div className={classes.Delete}>
      <div className={classes.Content}>
        <h2>Delete Account</h2>
        <form onSubmit={() => {
          props.hide();
          props.loading(true);
          props.delete();
          }}>
          <input onChange={props.setPass} type='password' id='password' value={props.pass} required/>
          <label htmlFor='password'>confirm password</label>
          <div className={classes.Buttons}>
            <input type='submit' value='Delete' />
            <button onClick={props.close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteUser;