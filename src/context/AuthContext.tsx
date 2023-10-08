'use client'
import { auth } from "@/app/lib/firebase";
import { errorToast } from "@/utils/toast";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null
  googleSignIn: () => void
  logOut: () => void
  loading: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignIn: () => {},
  logOut: () => {},
  loading: false
})

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const googleSignIn = () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .catch(() => errorToast("An error occurred during signin", { position: 'bottom-right' }))
      .finally(() => setLoading(false))
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])

  return <AuthContext.Provider
    value={{ user, googleSignIn, logOut, loading }}
    >
      {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)