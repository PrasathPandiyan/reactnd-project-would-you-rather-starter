import { RECEIVE_USERS, ANSWER_QUESTIONS, NEW_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case ANSWER_QUESTIONS :
          return {
              ...state,
              [action.authedUser]: {
                  ...state[action.authedUser],
                  answers: {
                      ...state[action.authedUser].answers,
                      [action.id]: action.answer,
                  },
              }
          }
      case NEW_QUESTION:
          const { author, id } = action.question;
          const { user } = action;
          console.log('action', action);
          return {
              ...state,
              [author] : {
                  ...state[author],
                  questions: user.questions.concat([id])
              }
          }
    default :
      return state
  }
}