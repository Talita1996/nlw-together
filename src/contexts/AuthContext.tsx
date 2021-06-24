import firebase from 'firebase';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../services/firebase';


export const AuthContext = createContext({} as AuthContextType);

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [ user, setUser ] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if( user ) {
            const { displayName, photoURL, uid } = user;

            if( !displayName || !photoURL ) {
            throw new Error( 'Missing information from Google Account. ');
            }

            setUser ({
            id: uid,
            name: displayName,
            avatar: photoURL
            })
        }
        })

        return () => { // Sempre se descadastrar do event listener no final do useEffect
        unsubscribe();
        }
    }, []) // Dispara uma função sempre que uma informação mudar, mas se o array que se refere ao componente estiver vazio, a função só executa uma vez

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        if( result.user ){
            const { displayName, photoURL, uid } = result.user;

            if( !displayName || !photoURL ) {
                throw new Error( 'Missing information from Google Account. ');
            }

            setUser ({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }
    return (
        <AuthContext.Provider value={ { user, signInWithGoogle } } >
            { props.children }
        </AuthContext.Provider>
    );
}