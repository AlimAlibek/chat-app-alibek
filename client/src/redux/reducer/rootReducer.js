import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { messagesReducer } from "./messagesReducer";
import { privateReducer } from "./privateReducer";
import { errorReducer } from "./errorReducer";
import { loadingReducer } from "./loadingReducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    private: privateReducer,
    messages: messagesReducer,
    error: errorReducer,
    loading: loadingReducer
})

