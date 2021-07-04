import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase';

import {AiOutlineUser} from 'react-icons/ai';
import {GoKey} from 'react-icons/go';

import Logo from '../../components/logo/logo';
import image from '../../assets/home-2banner.png';
import Spinner from '../../components/spinner/spinner';
import Error from './login_error/error';

import classes from './login.module.scss';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const setUsernameHandler = (e) => {
    setUsername(e.target.value);
  }

  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  }

  const closeError = () => {
    setShowError(false);
  }

  const loginUser = (e) => {
    e.preventDefault();
    console.log('funtion called');
    setShowSpinner(true);
    auth.signInWithEmailAndPassword(username, password)
      .then((cred) => {
        setShowSpinner(false);
        props.history.replace('/chat');
      })
      .catch((error) => {
        setShowSpinner(false);
        setErrorMsg(error.message);
        setShowError(true);
        console.log(error.message);
        console.log(error.code);
      })
  }

  return (
    <React.Fragment>
    {showSpinner && <Spinner />}
    {showError && <Error message={errorMsg} close={closeError} />}
    <div className={classes.Login}>
      <div>
        <Logo />
      </div>
      <div className={classes.Login_Flex}>
        <div className={classes.Login_Flex_Image}>
          <p className={classes.Login_Flex_Image_Header}>Wellcome Back</p>
          <p className={classes.Login_Flex_Image_Msg}>Connect with friends and the world around you</p>
          <img src={image} alt='wellcome' />
        </div>
        <div className={classes.Login_Flex_Form}>
          <div className={classes.LoginFormPosition}>
          <h2 className={classes.Login_Flex_Form_Header}>Login</h2>
          <form onSubmit={loginUser}>
            <div className={classes.Login_Flex_Form_Element}>
              <input onChange={setUsernameHandler} type="username" id="username" name="username" placeholder="Username" value={username}/>
              <AiOutlineUser size={20} />
            </div>
            <div className={classes.Login_Flex_Form_Element}>
              <input onChange={setPasswordHandler} type="password" id="passward" name="passward" placeholder="Password" value={password}/>
              <GoKey size={20} />
            </div>
            <input type="submit" value="Login" className={`btn-primary ${classes.Submit}`} />
          </form>
          <div className={classes.Login_Flex_Form_CreateAccount}>I'm new,want to <Link to="/create_account">create an Account</Link></div>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default withRouter(Login);