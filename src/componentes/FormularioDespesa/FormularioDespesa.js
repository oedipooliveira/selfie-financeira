import './FormularioDespesa.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const FormularioDespesa = (props) => {

    const navigate = useNavigate();

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    descricao,
                    valor
                }
            )
        };

        fetch("http://localhost:8080/despesas", requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/despesa');
            });

        setDescricao('');
        setValor('');
    }

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    return (
        <Formulario titulo="Despesa" onSubmit={aoSalvar}>
            <CampoTexto
                valor={descricao}
                aoAlterado={valor => setDescricao(valor)}
                label="Descrição"
                obrigatorio={true}
                placeholder="Digite a descrição da despesa"
            />
            <CampoTexto
                valor={valor}
                aoAlterado={valor => setValor(valor)}
                label="Valor"
                placeholder="Digite o valor da despesa"
            />
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioDespesa;