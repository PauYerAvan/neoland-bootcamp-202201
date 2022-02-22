import './DeleteAccount.css'
import { useState } from 'react'
import { unregisterUser } from '../Logic'
import Feedback from './Feedback'

function DeleteAccount({ token, onBack, onDeletedAccount }) {
    const [feedback, setFeedback] = useState()
    const [feedbackLevel, setFeedbackLevel] = useState()

    const goBack = event => {
        event.preventDefault()

        onBack()
    }

    const deleteAccount = event => {
        event.preventDefault()

        //const { target: { password: { value: password } } } = event
        const password = event.target.password.value

        try {
            unregisterUser(token, password)
                .then(() => onDeletedAccount())
                .catch(error => {
                    setFeedback(error.message)
                    setFeedbackLevel('error')
                })
        } catch (error) {
            setFeedback(error.message)
            setFeedbackLevel('error')
        }
    }


    return <div className="delete-account">
        <form className="delete-account__form" method="post" onSubmit={deleteAccount}>
            <input className="delete-account__password-input" type="password" name="password" placeholder="Password" />

            <button type="submit">Delete account</button>
            {feedback && <Feedback message={feedback} level={feedbackLevel} />}

            <a className="delete-account__back-link" href="" onClick={goBack}>back</a>
        </form>
    </div>
}

export default DeleteAccount