import './FormularioDespesa.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const FormularioDespesa = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        async function buscarDespesa() {
            const response = await fetch(`http://localhost:8080/despesas/${id}`);
            const despesaJson = await response.json();
            setDescricao(despesaJson.descricao);
            setValor(despesaJson.valor);
        }

        if (id) {
            buscarDespesa();
        }
    }, [id]);

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: (id != null ? "PUT" : "POST"),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    descricao,
                    valor
                }
            )
        };

        fetch(`http://localhost:8080/despesas/${id != null ? id : ''}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/despesa');
            });

        setDescricao('');
        setValor('');
    }

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