import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const Login = ({aoEfetuarLogin}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const aoLogar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    email,
                    senha
                }
            )
        };

        fetch(`http://localhost:8080/logar/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data?.access_token) {
                    sessionStorage.setItem('access_token', data.access_token);
                    navigate('/dashboard');
                    aoEfetuarLogin();
                }
            });

        setEmail('');
        setSenha('');
    }

    const aoCriarConta = () => {
        navigate('/conta');
    }

    return (
        <div className="form-login">
            <Formulario titulo="Login" onSubmit={aoLogar}>
                <CampoTexto
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}
                    label="E-mail"
                    obrigatorio={true}
                    placeholder="Digite seu e-mail"
                />
                <CampoTexto
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}
                    label="Senha"
                    obrigatorio={true}
                    placeholder="Digite sua senha"
                    tipo="password"
                />
                <Botao type="submit" largura="full">
                    Entrar
                </Botao>
                <Botao aoClicar={aoCriarConta} type="button" largura="full" cor="blue">
                    Criar conta
                </Botao>
            </Formulario>
        </div>
    );
}

export default Login;