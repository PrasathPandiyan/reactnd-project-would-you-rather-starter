export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUser(id, authedUser, answer, question) {
    return {
        type: ANSWER_QUESTIONS,
        id,
        authedUser,
        answer,
        question,
    }
}

export function updateCreatedQuestionUser(question, user) {
    return {
        type: NEW_QUESTION,
        question,
        user,
    }
}