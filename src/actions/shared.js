import {createAnswer, getAllUsers, getQuestions, saveQuestionAnswer} from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import {updateCreatedQuestionUser, updateUser} from './users';
import {updateAnswer, updateCreatedQuestion} from './questions';

export function handleLoggedInData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}

export function handleQuestionData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function answerQuestions (id, authedUser, answer, question) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(authedUser,id, answer)
            .then(() => {
                dispatch(updateAnswer(id, authedUser, answer, question));
                dispatch(updateUser(id, authedUser, answer, question));
                dispatch(hideLoading())
            })
    }
}

export function createQuestion(question, user) {
    return (dispatch) => {
        dispatch(showLoading())
        return createAnswer(question)
            .then((response) => {
                dispatch(updateCreatedQuestion(response, user));
                dispatch(updateCreatedQuestionUser(response, user));
                dispatch(hideLoading())
            })
    }
}