const initialState = {
    "1": [], "2": [], "3": [],
    sendingMessage: null
}

export const messagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case "NEW-MESSAGE" :  
            return {
                ...state,
                [action.payload.room]: state[action.payload.room].concat([action.payload.message])
            }
        case "NEW-ROOM-MESS" :
            return {
                ...state, 
                [action.payload.room]: state[action.payload.room] || []
            }

        case "SENDING-MESSAGE": {
            return {
                ...state,
                sendingMessage: action.payload.sending
            }
        }
        default: return state;
    }
}   