import { getInitialData, saveQuestionApi, saveQuestionAnswerApi } from '../utils/api'
import { myrecieveUsers, mysaveUserAnswer, mysaveUserQuestion } from './users'
import { myreceiveQuestions, mysaveQuestion, mysaveQuestionAnswer } from './questions'

export function handleInitialData() {
    return(dispatch) => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(myrecieveUsers(users))
                dispatch(myreceiveQuestions(questions))
            })
    }
}

export function handleSaveQuestion (author, optionOneText, optionTwoText) {
    const question = {
      author: author,
      optionOneText: optionOneText,
      optionTwoText: optionTwoText
    }
    return (dispatch) => {
      return saveQuestionApi(question).then((q) => {
        dispatch(mysaveQuestion(q))
        dispatch(mysaveUserQuestion(q.author, q.id))
      })
    }
  }
  
  export function handleAnswer (authedUser, qid, answer) {
    return (dispatch) => {
      dispatch(mysaveQuestionAnswer(authedUser, qid, answer))
      dispatch(mysaveUserAnswer(authedUser, qid, answer))
      return saveQuestionAnswerApi({
        authedUser: authedUser,
        qid: qid,
        answer: answer
      })
    }
  }