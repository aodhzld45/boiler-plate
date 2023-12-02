import {
    LOGIN_USER,
    REGISTER_USER
} from "../_actions/types"

export default function user_reducer (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess : action.payload }

        case REGISTER_USER:
            return { ...state, registerSuccess : action.payload }

        default:
            return state;
    }
}