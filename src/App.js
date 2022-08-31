import './App.css';
import './static/style.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from 'react';
import LoginModal from './components/login-modal/LoginModal';
import {Helmet} from "react-helmet";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal); 
  }
  return (
    // <Router>
      <div className="App">
        {/* <LoginModal show={showLoginModal} close={handleShowLoginModal} /> */}
        <h1> Interview Me Please! </h1>
        <div className = "main">
          <div className = "wrapper"> 
            <div className = "top_wrapper"> 
                <div className = "chat_embedding">
                  <div className = "chat_container">
                      <div class="chat_widget"></div>
                      <Helmet>
                        <link href="https://rayyungdev.github.io/react-chat/index.css" rel="stylesheet" />
                        <script async src="https://rayyungdev.github.io/react-chat/index.js"></script>
                      </Helmet>
                    </div>
                </div> 
                <button className = "update_button"> Update Answers</button>
            </div>
            {/* <div className = "bottom_thing"> 
              <code> this is where we will put in the embedding url of the customized chatbot for people to use. I am now writing this to test out possible other things yaddyayadyaada</code>
            </div> */}
          </div>
        </div>
      </div>
    // </Router>
  );
}

export default App;
