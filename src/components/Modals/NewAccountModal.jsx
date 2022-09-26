import React, { useState } from 'react';
import '../../static/LoginModal.scss';

const NewAccountModal = ({show, close}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verification, setVerification] = useState('');
    const [showErrors, setShowErrors] = useState('');
    const [errorMsgs, setErrorMsgs] = useState([]);

    if(!show){
      return null;
    }

    const handleClose = () => {
        // Clear Fields after success
        setEmail('');
        setPassword('')
        setVerification('')
        close()
        // Close Modal after success.
    }
    const handleSubmit = (e) => {
        e.preventDefault();
          // Set Empty on Submit
          setErrorMsgs([]);
              
          // Flag to check if email is valid or not
          let isValidEmail = false;
          setShowErrors(true);
          // Empty Email and Password Field
          if ( !email && !password) {
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
      
          if (password !== verification) {
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Your passwords do not match']);
              return false;
          }


          if (isValidEmail) {
            setShowErrors(false);

            let opts = {
              'email':email,
              'password':password
            }

            fetch('/api/users',{
              method: 'post',
              body: JSON.stringify(opts)
            }).then( r=> r.json())
            .then(response => {
              if(response.message){
                setShowErrors(false);
                alert('Success! Please Log In!')
                handleClose()
              }
              else{
                alert(response.error)
                isValidEmail = false;
                return false
              }
            })

          }
    
      }
    return(
        <div className="login-modal-ui">
              <form action="" method="post" onSubmit={handleSubmit} autoComplete="off">
                <h3 className="mdhead">Sign Up</h3>
                <span onClick={handleClose} title="Close" className="close">&times;</span>
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
                        placeholder = "Create your password."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mdrow">
                      <input 
                        type="password"
                        placeholder = "Verify your password."
                        value={verification}
                        onChange={e => setVerification(e.target.value)}
                      />
                    </div>
                </div> 
                <div className="mdactions">
                  <button type="submit" className="btnui" name = 'Create'>Sign Up</button>
                </div> 
              </form>
        </div>
    )
  }
  
  export default NewAccountModal;