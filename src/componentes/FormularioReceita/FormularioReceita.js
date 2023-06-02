import './FormularioReceita.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import CampoTexto from '../CampoTexto/CampoTexto';
import CampoData from '../CampoData/CampoData';
import Botao from '../Botao/Botao';

const FormularioReceita = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [recebimento, setRecebimento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        async function buscarReceita() {
            const requestOptions = {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            };
            const response = await fetch(`http://localhost:8080/receitas/${id}`, requestOptions);
            const receitaJson = await response.json();
            setDescricao(receitaJson.descricao);
            setValor(receitaJson.valor);
            setRecebimento(receitaJson.recebimento);
            setGrupo(receitaJson.grupo._id);
        }

        if (id) {
            buscarReceita();
        }
    }, [id]);

    useEffect(() => {
        async function fetchGrupos() {
            const requestOptions = {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            };
            const response = await fetch('http://localhost:8080/grupos', requestOptions);
            const gruposJson = await response.json();
            setGrupos(gruposJson);
        }
        fetchGrupos();
    }, []);

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: (id != null ? "PUT" : "POST"),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
            },
            body: JSON.stringify(
                {
                    descricao,
                    valor,
                    recebimento,
                    grupo
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
    }

    const aoCancelar = () => {
        navigate('/receita');
    }

    return (
        <Formulario titulo="Receita" onSubmit={aoSalvar}>
            <CampoTexto
                valor={descricao}
                aoAlterado={valor => setDescricao(valor)}
                label="Descrição"
                obrigatorio={true}
                placeholder="Digite a descrição da receita"
            />
            <CampoTexto
                valor={valor}
                aoAlterado={valor => setValor(valor)}
                label="Valor"
                obrigatorio={true}
                placeholder="Digite o valor da receita"
            />
            <CampoData
                valor={recebimento}
                aoAlterado={valor => setRecebimento(valor)}
                obrigatorio={true}
                label="Data de recebimento"
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

export default FormularioReceita;