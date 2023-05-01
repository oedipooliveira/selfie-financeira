import './FormularioReceitaQuitacao.css';
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

const FormularioReceitaQuitacao = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [recebimento, setRecebimento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [formaRecebimento, setFormaRecebimento] = useState('');

    useEffect(() => {
        async function buscarReceita() {
            const response = await fetch(`http://localhost:8080/receitas/${id}`);
            const receitaJson = await response.json();
            setDescricao(receitaJson.descricao);
            setValor(receitaJson.valor);
            setRecebimento(receitaJson.recebimento);
            setGrupo(receitaJson.grupo._id);
            setFormaRecebimento(receitaJson.formaRecebimento);
        }

        if (id) {
            buscarReceita();
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
                    recebimento,
                    grupo,
                    formaRecebimento
                }
            )
        };

        fetch(`http://localhost:8080/receitas/${id != null ? id : ''}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/receita');
            });

        setDescricao('');
        setValor('');
        setRecebimento('');
        setGrupo('');
        setFormaRecebimento('');
    }

    const aoCancelar = () => {
        navigate('/receita');
    }

    return (
        <Formulario titulo="Quitação de Receita" onSubmit={aoSalvar}>
            <CampoExibicao
                valor={descricao}
                label="Descrição"
            />
            <CampoExibicao
                valor={FormataValorReal(valor)}
                label="Valor"
            />
            <CampoExibicao
                valor={FormataData(recebimento)}
                label="Data de recebimento"
            />
            <ListaSuspensa
                valor={formaRecebimento}
                aoAlterado={valor => setFormaRecebimento(valor)}
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

export default FormularioReceitaQuitacao;