import React, { useState } from 'react';
import '../../static/LoginModal.scss';
import { login } from '../../react-token-auth';


const LoginModal = ({show, close, create}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrors, setShowErrors] = useState('');
    const [errorMsgs, setErrorMsgs] = useState([]);

    if (!show){
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.nativeEvent.submitter.name === 'login'){
          setErrorMsgs([]);

          let isValidEmail = false;
          setShowErrors(true);

          if(!email &&!password){
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Email and Password is a required field.']);
              return false;
          }

              // If empty Email
          if (!email) {
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Email is a required field.']);
          } else {
              // Validate Email
              if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Invalid email address.']);
              } else {
              isValidEmail = true;
              }
          }

              // if empty password
          if (!password) {
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Password is a required field.']);
              return false;
          }

          if (isValidEmail) {
              let opts = {
                'email':email,
                'password':password
              }
              fetch('https://interviewmeplz.com:8080/api/login',{
                method: 'post',
                body: JSON.stringify(opts)
              }).then( r=> r.json())
              .then(token => {
                if(token.accessToken){
                  login(token)
                  setShowErrors(false);
                  setEmail('');
                  setPassword('')
                  // Close Modal after success.
                  setTimeout(close,1000);
                }
                else{
                  setErrorMsgs(errorMsgs => [...errorMsgs, 'Please type in a valid username/password']);
                  setShowErrors(true);
                  isValidEmail = false;
                  return false
                }
              })
            }
        }
    }
    return (
        <>
          <div className="login-modal-ui">
            <form action="" method="post" onSubmit={handleSubmit} autoComplete="off">
              <h3 className="mdhead">Please Login</h3>
              {
              showErrors ? errorMsgs.map((msg, index) => {
                  return <div key={index} className="alertdanger">{msg}</div>;
              }) 
              : 
              ''
              }
              <div className="mdbody">
                  <div className="mdrow">
                    <input 
                      type="email"
                      placeholder = "Enter your email."
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mdrow">
                    <input 
                      type="password"
                      placeholder = "Enter your password."
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
              </div> 
              <div className="mdactions">
                <button type="submit" className="btnui" name = 'login'>Login</button>
                <button onClick={() => create()} className="btnui" name = 'Create' type = 'button'>Create Account</button>
              </div> 
            </form>
          </div>
        </>
      );
};

export default LoginModal;