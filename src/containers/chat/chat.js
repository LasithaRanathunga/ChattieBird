import React, {useState, useEffect} from 'react'
import {auth, firestore} from '../../firebase';
import firebase from "firebase/app";
import "firebase/auth";

import Delete from './deleteUser/deleteUser';
import Spinner from '../../components/spinner/spinner';

import {BsChevronRight} from 'react-icons/bs';
import Members from './members/members';
import ChatRoom from './chatRoom/chatRoom';
import classes from './chat.module.scss';

const Chat = () => {

  const [userInfo, setUserInfo] = useState(undefined);
  const [members, setMembers] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [sideDrawer, setSideDrawer] = useState(false);
  
  const [conPass, setConPass] = useState('');
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const uinfo = firestore.collection('users').doc(user.uid);
      uinfo.get()
        .then((doc) => {
          setUserInfo({...doc.data()});
        });
      firestore.collection("users").where("userId", "!=", user.uid).onSnapshot(snap => {
        const arr = [];
        snap.forEach(doc => {
          arr.push(doc.data());
        })
        setMembers(arr);
      })
    })
  }, []);

  const sideDrowerHandler = () => {
    setSideDrawer(!sideDrawer);
  }

  const deleteUser = (props) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      conPass
    );
    user.reauthenticateWithCredential(cred)
      .then(() => {
        user.delete().then(() => {
          setLoading(false);
          props.history.replace('/login');
        }).catch((error) => {
          console.log(error.message);
        })
      }).catch((error) => {console.log(error.message)})
      firestore.collection('users').doc(user.uid).delete()
        .then(() => {
          console.log('deleted');
        })
  }

  const setPass = (e) => {
    e.preventDefault();
    setConPass(e.target.value);
  }

  const showDeletePopup = () => {
    setDeletePopup(true);
  }

  const hideDeletePopup = () => {
    setDeletePopup(false);
  }

  const arrowStyle = sideDrawer ? classes.HideDrawer : classes.ShowDrawer;

  return (
    <React.Fragment>
    {loading && <Spinner />}
    {deletePopup && <Delete pass={conPass} delete={deleteUser} hide={hideDeletePopup} setPass={setPass} loading={(x) => setLoading(x)} close={hideDeletePopup}/>}
    <div className={classes.Chat}>
      <BsChevronRight size={28} className={arrowStyle} onClick={sideDrowerHandler} />
      {(userInfo && members) && <Members user={userInfo} members={members} drawer={sideDrawer}/>}
      {(userInfo && members) && <ChatRoom show={showDeletePopup}/>}
    </div>
    </React.Fragment>
  )
}

export default Chat;