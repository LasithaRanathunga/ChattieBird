import './App.scss';
import React, {useEffect} from 'react'
import {Route, withRouter} from 'react-router-dom';
import { auth } from './firebase';

import Login from './containers/login_Page/login';
import CreateAccount from './containers/createAccount_Page/createAccount';
import Successful from './containers/createAccount_Page/successful/successful';
import Chat from './containers/chat/chat';


function App(props) {

  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => {
      let autoRedirect = true;
      if ((user !== null) && autoRedirect) {
        props.history.replace('/chat');
        autoRedirect = false;
      } else if ((user == null) && autoRedirect) {
        props.history.replace('/login');
        autoRedirect = false;
        unsub();
      }
    });
  },[props.history])
  return (
    <div className="App">
      <Route exact path='/login' component={Login} />
      <Route exact path='/create_account' component={CreateAccount} />
      <Route exact path='/creat_account/successful' component={Successful} />
      <Route exact path='/chat' component={Chat} />
    </div>
  );
}

export default withRouter(App);