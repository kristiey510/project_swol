import {createContext, useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'

const AuthContext = createContext(
    {
        currentUser: null,
    }
)

export user useAuth = () =>useContext(AuthContext)

export default function AuthContextProvider({children}){
    const[current, currentUser] = useState(null)
    const value = {
        currentUser,
    }
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}