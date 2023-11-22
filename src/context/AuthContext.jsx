import React, { createContext, useEffect, useState } from "react";
import api from '../Services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [pessoas, setPessoas] = useState(null);

    useEffect(() => {
        api.get('/pessoa')
            .then((response) => {
                setPessoas(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const login = (email, senha) => {
        const pessoaEncontrada = pessoas.find(pessoa => pessoa.email === email && pessoa.senha === senha);

        if (pessoaEncontrada) {
            console.log('Usuário logado');
            setUser({ user: pessoaEncontrada.nome, role: pessoaEncontrada.role });
        } else {
            console.log('Credenciais inválidas');
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
