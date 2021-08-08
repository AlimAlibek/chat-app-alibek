const initState = {
    currentUser: "",
    users: [],
    usersAmount: {},
    currentRoom: "1"
}

export const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case "CONNECT": {
            const users = state.currentRoom > 3 ? state.users : action.payload.users[state.currentRoom];
            return {
                ...state,
                currentUser: action.payload.user,
                users: users,
                usersAmount: action.payload.usersAmount,
                currentRoom: action.payload.room
            }
        };
        case "ROOM-CHANGE": {
            return {
                ...state,
                currentRoom: action.payload.room
            }
        }
        case "USERS-CHANGE": {
            const users = state.currentRoom > 3 ? state.users : action.payload.users[state.currentRoom];
            return {
                ...state, 
                usersAmount: action.payload.usersAmount || state.usersAmount,
                users: users
            }
        }

        case "PRIVAT-ROOM": {
            return {
                ...state,
                users: action.payload.users,
                currentRoom: action.payload.room,
                usersAmount: action.payload.usersAmount
            }
        }

        default: return state
    }
}

