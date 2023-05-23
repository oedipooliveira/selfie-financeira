import './Login.css';
import { useState } from 'react';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const aoLogar = (event) => {

    }

    return (
        <div className="form-login">
            <Formulario titulo="Login" onSubmit={aoLogar}>
                <CampoTexto
                    valor={usuario}
                    aoAlterado={valor => setUsuario(valor)}
                    label="Usuário"
                    obrigatorio={true}
                    placeholder="Digite seu usuário"
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
                <p className="text-center text-bold">OU</p>
                <Botao type="submit" largura="full" cor="blue">
                    Criar conta
                </Botao>
            </Formulario>
        </div>
    );
}

export default Login;