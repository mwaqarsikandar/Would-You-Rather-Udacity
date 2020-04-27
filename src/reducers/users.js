import { RECIEVE_USER, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from '../actions/users'

export default function users(state= {}, action) {
    switch(action.type) {
        case RECIEVE_USER :
            return {
                ...state,
                ...action.users
            }
        case SAVE_USER_ANSWER :
            return {
              ...state,
              [action.user] : {
                ...state[action.user],
                answers : {
                  ...state[action.user].answers,
                  [action.qid] : action.answer
                }
              }
            }
        case SAVE_USER_QUESTION :
            return {
              ...state,
              [action.user] : {
                ...state[action.user],
                questions: [...state[action.user].questions, action.qid]
              }
            }
        default :
            return state
    }
}