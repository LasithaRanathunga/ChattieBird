import React from 'react'

import classes from './members.module.scss';

const Members = (props) => {

  const drawerStyle = props.drawer ? classes.Members_show : classes.Members_hide;

  return (
    <div className={drawerStyle}>
      <div className={classes.UserInfo}>
        <img src={props.user.dp} alt='profile'  className={classes.UserInfo_Dp}/>
        <div>
          <p className={classes.UserInfo_UserName}>{`${props.user.firstName} ${props.user.lastName}`}</p>
        </div>
      </div>
      <form className={classes.Search}>
        <input id='search' name='search' placeholder='Search Friends'/>
      </form>
      <div className={classes.Friends}>
        {
          props.members.map(el => {
            return (
              <div className={classes.Friends_Friend} key={el.userId}>
                <img src={el.dp} alt='member-dp'/>
                <p>{`${el.firstName} ${el.lastName}`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Members;