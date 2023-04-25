import './FormularioDespesa.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import CampoTexto from '../CampoTexto/CampoTexto';
import CampoData from '../CampoData/CampoData';
import Botao from '../Botao/Botao';

const FormularioDespesa = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        async function buscarDespesa() {
            const response = await fetch(`http://localhost:8080/despesas/${id}`);
            const despesaJson = await response.json();
            setDescricao(despesaJson.descricao);
            setValor(despesaJson.valor);
            setVencimento(despesaJson.vencimento);
            setGrupo(despesaJson.grupo._id);
        }

        if (id) {
            buscarDespesa();
        }
    }, [id]);

    useEffect(() => {
        async function fetchGrupos() {
            const response = await fetch('http://localhost:8080/grupos');
            const gruposJson = await response.json();
            setGrupos(gruposJson);
        }
        fetchGrupos();
    }, []);

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
                    grupo
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
    }

    const aoCancelar = () => {
        navigate('/despesa');
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
                obrigatorio={true}
                placeholder="Digite o valor da despesa"
            />
            <CampoData
                valor={vencimento}
                aoAlterado={valor => setVencimento(valor)}
                obrigatorio={true}
                label="Data de vencimento"
            />
            <ListaSuspensa
                valor={grupo}
                aoAlterado={valor => setGrupo(valor)}
                obrigatorio={true}
                label="Grupo"
                itens={grupos.map(g => ({key: g._id, value: g.nome}))}
            />
            <div className="flexbox">
                <Botao aoClicar={aoCancelar} type="button" cor="blue">
                    <FaArrowLeft size={15} />
                </Botao>
                <Botao type="submit" largura="full">
                    Salvar
                </Botao>
            </div>
        </Formulario>
    );
}

export default FormularioDespesa;