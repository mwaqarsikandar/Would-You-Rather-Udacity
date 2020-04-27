export const RECIEVE_USER = 'RECIEVE_USER'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'


export function myrecieveUsers(users) {
    return {
        type: RECIEVE_USER,
        users,
    }
}

export function mysaveUserQuestion (user, qid) {
    return {
      type: SAVE_USER_QUESTION,
      user,
      qid,
    }
  }

  export function mysaveUserAnswer (user, qid, answer) {
    return {
      type: SAVE_USER_ANSWER,
      user,
      qid,
      answer
    }
  }