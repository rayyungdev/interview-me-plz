import './App.css';
import './static/style.css'
import React, { useState} from 'react';
import LoginModal from './components/Modals/LoginModal';
import NewAccountModal from './components/Modals/NewAccountModal';
import Interface from './components/Interface';

import { useAuth, logout} from './react-token-auth';

const App =() => {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showCreateModal, setCreateModal] = useState(false);

  const handleShowLoginModal = () => { setShowLoginModal(!showLoginModal); }
  const handleCreateModal = () => { 
    setCreateModal(!showCreateModal); 
    handleShowLoginModal();
  }

  const [logged] = useAuth();

  const handleLogout = () => {
    logout();
    handleShowLoginModal();
    window.location.reload(false)
  }

  return(
    <div className = 'App'>
      <h1> InterviewMePlz.com </h1>
      <div className = "main"> 
        {!logged?
          <>
          <LoginModal show={showLoginModal} close = {handleShowLoginModal} create = {handleCreateModal}/>
          <NewAccountModal show = {showCreateModal} close = {handleCreateModal} />
          </>
        : 
          <Interface handleLogout={handleLogout}/> 
        }
      </div>
    </div>
  )
}

export default App;
// import './App.css';
// import './static/style.css'
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { useState} from 'react';
// import LoginModal from './components/login-modal/LoginModal';
// import UpdateModal from './components/login-modal/UpdateModal';

// import {login, useAuth,authFetch, logout} from "./auth"

// import {Helmet} from "react-helmet";

// function App() {
//   const [showLoginModal, setShowLoginModal] = useState(true);
//   const [showUpdateQuestion, setShowUpdateQuestion] = useState(false);
//   const [message, setMessage] = useState('')

//   const handleUpdateModal = () => {
//     setShowUpdateQuestion(!showUpdateQuestion)
//   }
//   const handleShowLoginModal = () => {
//     setShowLoginModal(!showLoginModal); 
//   }

//   const [logged] = useAuth();
//   const retrieve_questions = () =>{
//     authFetch("/api/protected").then(response => {
//         if (response.status === 401){
//             setMessage("Sorry you aren't authorized!")
//             return null
//         }
//         return response.json()
//         }).then(response => {
//         if (response && response.message){
//             setMessage(response.message)
//         }
//         })
// }

//   return (
//     // <Router>
//       <div className="App">
//         <h1> Interview Me Please! </h1>
//         <div className = "main">
//           <div className = "wrapper"> 
//             <div className = "top_wrapper"> 
//               <h3> Interview-Bot Demo</h3>
//                     {!logged? <LoginModal show={showLoginModal} close={handleShowLoginModal} login = {login}/>
//                     :<button onClick ={() => logout()}>Logout</button> 
//                     }
//                   <div className = "chat_embedding">
//                       <div className="chat_widget" userid = "51c1c976-a0bf-4a18-a042-fcac62cc46ca" name = "Raymond Bot"></div>
//                       <Helmet>
//                         <link href="https://rayyungdev.github.io/react-chat/index.css" rel="stylesheet" />
//                         <script async src="https://rayyungdev.github.io/react-chat/index.js"></script>
//                       </Helmet>
//                   </div> 
//                     <button onClick = {() => {setShowUpdateQuestion(true); retrieve_questions(message)}} className = "update_button"> Update Answers</button>
//                     <UpdateModal show = {showUpdateQuestion} close = {handleUpdateModal}/> 
//                 </div>


//             </div>
//         </div>
//       </div>
//     // </Router>
//   );
// }

// export default App;
