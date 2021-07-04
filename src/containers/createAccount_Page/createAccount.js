import React, {useState} from 'react'
import {storage, auth, firestore} from '../../firebase';

import defultImg from '../../assets/Blank-Trainer.png';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import Success from '../../containers/createAccount_Page/successful/successful';
import classes from './createAccount.module.scss';

const CreateAccount = (props) => {

  const [img, setimg] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [tryed, setTryed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setImage = (e) => {
    e.preventDefault();
    const getfile = e.target.files[0];
    console.log('funtion run');
    setFile(getfile);
    setimg(URL.createObjectURL(getfile));
  }

  const confirmPassword = (e) => {
    if(password === e.target.value) {
      setPasswordConfirmed(true);
    } else {
      setPasswordConfirmed(false);
    }
  }

  const createAccount = (e) => {
    e.preventDefault();
    setTryed(true);
    if (passwordConfirmed && password.length >= 6) {
      setLoading(true);
      if (file) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`userImages/${file.name}`);
        fileRef.put(file)
          .then(snap => {
            fileRef.getDownloadURL()
              .then(url => {
                firestore.collection('users').doc(`${auth.currentUser.uid}`).set({
                  firstName: firstName,
                  lastName: lastName,
                  userId: auth.currentUser.uid,
                  email: email,
                  dp: url
                }
                ).then(() => {
                  console.log('user registration sucssesful');
                  setLoading(false);
                  setSuccess(true);
                })
              })
          });
      })
      .catch (error => console.log(error.message))
    }
    else {
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
                firestore.collection('users').doc(`${auth.currentUser.uid}`).set({
                  firstName: firstName,
                  lastName: lastName,
                  userId: auth.currentUser.uid,
                  email: email,
                  dp: 'https://firebasestorage.googleapis.com/v0/b/test-chatapp-466d7.appspot.com/o/userImages%2Fdefault.png?alt=media&token=872791dc-9258-487f-bc8e-f5995513d83a'
                }
                ).then(() => {
                  console.log('user registration sucssesful');
                  setLoading(false);
                  setSuccess(true);
                })
      })
      .catch (error => console.log(error.message))
    }
  }
  }

  const setValue = (e, func) => {
    func(e.target.value);
  }


  return (
    <React.Fragment>
    {loading && <Spinner />}
    {success && <Success pushHistory={props.history.push} unmountSuccessPopup={setSuccess} />}
    <div className={classes.Account}>
      <Logo />
      <div className={classes.Account_Flex}>
        <div className={classes.Account_Flex_Photo}>
          <h2 className={classes.Account_Flex_Photo_Header}>Upload your photo</h2>
          <div className={classes.Account_Flex_Photo_Img}>
            {img ? <img src={img} alt="profile" style={{height: '100%'}}/> : <img src={defultImg} alt="profile" />}
          </div>
          <div className={classes.Account_Flex_Photo_Selector}>
            <input onChange={setImage} type="file" id="file"/>
            <label htmlFor="file" className="btn-primary">Choose file</label>
          </div>
          <p className={classes.Account_Flex_Photo_Info}>This in not a mandatory. You can upload a profile picture after later and you can remove it any time you want</p>
        </div>
        <div className={classes.Account_Flex_Form}>
          <h2 className={classes.Account_Flex_Form_Header}>Create Account</h2>
          <p>Please fill in the form below, it only takes a minute</p>
          <form className={classes.Account_Flex_Form_Elements} onSubmit={createAccount}>
            <div className={classes.Account_Flex_Form_Elements_Element}>
              <input onChange={(e) => setValue(e, setFirstName)} type='text'id="firstName" name="firstName" value={firstName} required/>
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className={classes.Account_Flex_Form_Elements_Element}>
              <input onChange={(e) => setValue(e, setLastName)} type='text'id="lastName" name="lastName" value={lastName} required/>
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className={classes.Account_Flex_Form_Elements_Element}>
              <input onChange={(e) => setValue(e, setEmail)} type='email'id="email" name="email" value={email} required/>
              <label htmlFor="email">Email</label>
            </div>
            <div className={classes.Account_Flex_Form_Elements_Element}>
              <input onChange={(e) => setValue(e, setPassword)} type='password' id="password" name="password" value={password} required/>
              <label htmlFor="password">Password</label>
              {password && password.length < 6 ? <p className="warning">Password should contain atleast 6 characters</p> : null}
              {password && password.length >= 6 ? <p className="succes">Srong password</p> : null}
            </div>
            <div className={classes.Account_Flex_Form_Elements_Element}>
              <input onChange={(e) => {
                setValue(e, setConfirmPassword)
                confirmPassword(e);
              }} type='password'id="confirmPassword" name="confirmPassword" value={confirmpassword} required/>
              <label htmlFor="confirmPassword">Confirm Password</label>
              {!passwordConfirmed && tryed ? <p className="warning">Password hasn't confirmed correctly</p> : null}
              {passwordConfirmed && tryed && password? <p className="succes">Password confirmed correctly</p> : null}
            </div>
            <input type="submit" value="Create Account" className={`btn-primary ${classes.Submit}`}/>
          </form>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default CreateAccount;