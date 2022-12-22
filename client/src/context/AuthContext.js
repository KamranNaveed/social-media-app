import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer.js"

const INITIAL_STATE = {
    user: {
        _id: "63a4a8cb039e18e1078b86b0",
        username: "kamidon",
        email: "kamidon@kamidon"
    },
    isFetching : false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}