import './Login.css';
import { useState } from 'react';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const aoLogar = (event) => {

    }

    return (
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
        </Formulario>
    );
}

export default Login;