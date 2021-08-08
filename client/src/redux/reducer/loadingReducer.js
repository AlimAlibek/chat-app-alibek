
const initState = {
    loading: false
}
export const loadingReducer = (state=initState, action) => {
    switch (action.type) {
        case "LOADING" :
            return {
                ...state, loading: action.payload.loading
            };
        default: return state;
    }
}