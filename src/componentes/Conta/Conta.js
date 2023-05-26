import './Conta.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const Conta = () => {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    nome,
                    email,
                    senha
                }
            )
        };

        fetch(`http://localhost:8080/usuarios/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/login');
            });

        setNome('');
        setEmail('');
        setSenha('');
    }

    const aoAcessarLogin = (event) => {
        navigate('/login');
    }

    return (
        <div className="form-login">
            <Formulario titulo="Criar Conta" onSubmit={aoSalvar}>
                <CampoTexto
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                    label="Nome"
                    obrigatorio={true}
                    placeholder="Digite seu nome"
                />
                <CampoTexto
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}
                    label="E-mail (usuário)"
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
                    Salvar
                </Botao>
                <Botao aoClicar={aoAcessarLogin} type="button" largura="full" cor="blue">
                    Já possuo uma conta
                </Botao>
            </Formulario>
        </div>
    );
}

export default Conta;