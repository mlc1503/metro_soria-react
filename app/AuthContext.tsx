import { useSQLiteContext } from 'expo-sqlite';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';



export interface User{
    id:number, 
    username:string,
    email:string
}

interface AuthContextType{
    user: User | null,
    isLoading: boolean,
    login: (username:string, password:string) => Promise<{ success: boolean; error?:string }>
    register: (username:string, password:string, email:string) => Promise<{ success: boolean; error?:string }>
    logout: ()=>undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider:React.FC<AuthProviderProps> = ({children})=>{
    
    const db = useSQLiteContext();
    
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        const checkAuth = async () => {
            try {
                setIsLoading(false)
            } catch (error) {
                console.error("Auth initialization error: ", error)
                setIsLoading(false)
            }            
        }

        checkAuth()
    }, []);


    const login = async(username:string, password:string)=>{
        try {
            const result = await db.getAllAsync<User>(
                'SELECT id, username, email FROM users WHERE username = ? AND password = ?',
                [username, password]
            );
            
            if (result && result.length > 0) {
                const user = { id: result[0].id, username: result[0].username, email: result[0].email };
                setUser(user);
                return { success: true }; 
            }
            return { success: false, error: 'Invalid credentials' };
            
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        }
    }


    const register = async(username:string, password:string, email:string)=>{
        try {

            await db.runAsync(
                'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                [username, password, email]
            );
            return {success: true}

        } catch (error: any) {
            return{
                success: false,
                error: error.message
            }
        } 
    }

    const logout = ():undefined=>{
        setUser(null)
        return undefined
    }


    return(
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = ():AuthContextType =>{
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}