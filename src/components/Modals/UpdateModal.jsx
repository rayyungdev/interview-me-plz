import React, {useState} from "react";
import '../../static/UpdateModal.scss'
import {authFetch} from "../../react-token-auth";

const UpdateModal = ({show, close}) => {
    const [questions, setQuestions] = useState('');
    const [answers, setAnswers] = useState('');

    const handleSubmit = (e) => {
        authFetch("https://interviewmeplz.com:8080/api/update_response", {
            method : "post",
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(answers)
        }).then( r=> r.json())
        .then(message => {
            if(message.message){
                alert(message.message)
            }
            else{
                alert('Something went wrong...')
            }
        }
        )        
    }

    const RetrieveQuestions =() => {
        authFetch("https://interviewmeplz.com:8080/api/retrieve_questions").then(
            response => {
                if (response.status === 401){
                    alert('Something went wrong...')
                }
                return response.json()
            }
        ).then(
            response => {
                if (response && response.questions){
                    setQuestions(response.questions)
                    setAnswers(response.answers)
                }
            }
        )
    }

    if (!show){
        return null;
    }
    if(questions){

        return (
            <>
                <div className = "update-modal-ui">
                    <form action="" onSubmit={handleSubmit} autoComplete="off">
                    <h2 className="mdhead">Update Answers</h2>
                    <div className="mdbody">
                    <span onClick={close} title="Close" className="close">&times;</span>

                        <ul className = 'mdrow' >
                        {
                            Object.entries(questions).map(([key, question]) => 
                                (
                                    <li key = {key}>
                                        <p> {question}</p>
                                        <textarea key = {question} value = {answers[key]} onChange = {(e) => setAnswers(prevAnswer => ({...prevAnswer, [key]:e.target.value}))} type = 'text' />      
                                    </li>                          
                                    )
                            ) 
                        }
                        </ul>

                        <div className="mdactions">
                        <button type="submit" className="btnui" >Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
            </>
        )
    }
    else{
        RetrieveQuestions()
    }
}

export default UpdateModal
