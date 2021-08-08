

export const connect = (user, users, usersAmount, room) => {
    return {
        type: "CONNECT",
        payload: {
            user, users, usersAmount, room
        }
    }
}

export const roomChange = (room) => {
        return {
            type: "ROOM-CHANGE",
            payload: {
                room
            }
        }
    
}

export const usersChange = (users, usersAmount) => {
    return {
        type: "USERS-CHANGE",
        payload: {
            users, usersAmount,
        }
    }
}

export const createRoom = (privateUsers, room) => {
    return {
        type: "CREATE-ROOM",
        payload: {
            users: privateUsers, room
        }
    }
}

export const privateUsersChange = (privateUsers) => {
    return {
        type: "PRIVATE-USERS-CHANGE",
        payload: {
            users: privateUsers
        }
    }
}

export const newMessage = (room, message) => {
    if (message) {
        return {
            type: "NEW-MESSAGE",
            payload: {
                message, room
            }
        }
    }

    return {
        type: "NEW-ROOM-MESS",
        payload: { room }
    }
    
}   

export const sendingMessage = sending => {
    return {
        type: "SENDING-MESSAGE",
        payload: {sending}
    }
}

export const setLoader = boolean => {
    return {
        type: "LOADING",
        payload: {loading: boolean}
    }
}

export const throwError = error => {
    return {
        type: "ERROR",
        payload: {error}
    }
}
