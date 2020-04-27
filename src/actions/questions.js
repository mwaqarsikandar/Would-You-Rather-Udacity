export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function myreceiveQuestions (questions) {
    return { 
        type: RECEIVE_QUESTION,
        questions
    }
}

export function mysaveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function mysaveQuestionAnswer (authedUser, qid, answer) {
    return {
      type: SAVE_QUESTION_ANSWER,
      authedUser,
      qid,
      answer
    }
  }