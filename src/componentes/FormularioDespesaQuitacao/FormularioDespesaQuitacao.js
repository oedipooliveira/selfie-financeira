import './FormularioDespesaQuitacao.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import CampoExibicao from '../CampoExibicao/CampoExibicao';
import Botao from '../Botao/Botao';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';
import formasPagamento from '../../util/FormasPagamento.js';

const FormularioDespesaQuitacao = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');

    useEffect(() => {
        async function buscarDespesa() {
            const response = await fetch(`http://localhost:8080/despesas/${id}`);
            const despesaJson = await response.json();
            setDescricao(despesaJson.descricao);
            setValor(despesaJson.valor);
            setVencimento(despesaJson.vencimento);
            setGrupo(despesaJson.grupo._id);
            setFormaPagamento(despesaJson.formaPagamento);
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
                    valor,
                    vencimento,
                    grupo,
                    formaPagamento
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
        setVencimento('');
        setGrupo('');
        setFormaPagamento('');
    }

    const aoCancelar = () => {
        navigate('/despesa');
    }

    return (
        <Formulario titulo="Quitação de Despesa" onSubmit={aoSalvar}>
            <CampoExibicao
                valor={descricao}
                label="Descrição"
            />
            <CampoExibicao
                valor={FormataValorReal(valor)}
                label="Valor"
            />
            <CampoExibicao
                valor={FormataData(vencimento)}
                label="Data de vencimento"
            />
            <ListaSuspensa
                valor={formaPagamento}
                aoAlterado={valor => setFormaPagamento(valor)}
                obrigatorio={true}
                label="Forma de pagamento"
                itens={formasPagamento}
            />
            <div className="flexbox">
                <Botao aoClicar={aoCancelar} type="button" cor="blue">
                    <FaArrowLeft size={15} />
                </Botao>
                <Botao type="submit" largura="full">
                    Quitar
                </Botao>
            </div>
        </Formulario>
    );
}

export default FormularioDespesaQuitacao;