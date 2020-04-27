export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const UNSET_AUTHED_USER = 'DELETE_AUTHED_USER'


export function setAuthedUser (id) {
    return {
        type : SET_AUTHED_USER,
        id
    }
}

export function deleteAuthedUser () {
    return {
        type: UNSET_AUTHED_USER,
        id: ''
    }
}