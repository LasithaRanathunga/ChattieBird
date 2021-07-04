import React, {useState, useEffect} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import {withRouter} from 'react-router-dom';
import {auth, firestore} from '../../../firebase';
import {IoMdSend} from 'react-icons/io';
import Message from './message/message';

import classes from './chatRoom.module.scss';


const ChatRoom = (props) => {

  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(null);

  useEffect(() => {
    let uid = null;
    firestore.collection('chat').orderBy('timestamp').onSnapshot(doc => {
      const msgs = [];
      doc.forEach((i) => {
        const data = i.data();
        const chat = {
          ...data,
          sameUser: (uid === data.uid)
        }
        uid = data.uid;
        msgs.push(chat);
      })
      setChats(msgs);
    })
  }, []);
  
  const setMsg = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }
  
  const sendMessage = (e) => {
    e.preventDefault();
    setMessage('');
    // const {userId, dp} = await auth.currentUser;
    const getUser = new Promise((resolve, reject) => {
      resolve(auth.currentUser);
    })

    getUser
      .then((user) => {
        console.log(user.uid);
      firestore.collection("users").doc(user.uid).get().then((doc) => {
        const data = doc.data();
          firestore.collection("chat").add({
          text: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: data.userId,
          url: data.dp
        }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
      })
    })
  }
  return (
    <div className={classes.ChatRoom}>
      <div className={classes.ChatName}>
        <h3>Thanikadayo</h3>
        <div>
          <button onClick={props.show} className={`btn-primary ${classes.Btn} ${classes.Btn_Delete}`}>Delete Account</button>
        </div>
      </div>
      <div className={classes.Container}>
        <div className={classes.Chat}>
          {chats ? chats.map((chat) => {return <Message key={Math.random()} data={chat} />}) : null}
        </div>
        <div className={classes.Message}>
          <form>
            <input onChange={setMsg} type='text' id='message' placeholder='Write Something' value={message}/>
            <button onClick={sendMessage}><IoMdSend size={20}/></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ChatRoom);