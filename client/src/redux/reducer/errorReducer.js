const initState = {
    error: ""
}
export const errorReducer = (state=initState, action) => {
    switch(action.type) {
        case "ERROR" :
            return {
                ...state,
                error: action.payload.error   
            };
            
        default: return state;
    }
}