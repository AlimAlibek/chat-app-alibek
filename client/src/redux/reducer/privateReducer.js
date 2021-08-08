
const initialState = {
    users: [],
    room: ""
}
export const privateReducer = (state=initialState, action) => {
    switch(action.type) {
        case "CREATE-ROOM" :
            return {
                ...state,
                users: action.payload.users,
                room: action.payload.room
            }

        case "PRIVATE-USERS-CHANGE" :
            return {
                ...state,
                users: action.payload.users
            }
        default: return state;
    }
}