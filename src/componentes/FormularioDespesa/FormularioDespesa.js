import './FormularioDespesa.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import Botao from '../Botao/Botao';

const FormularioDespesa = (props) => {

    const navigate = useNavigate();

    const grupos = [
        {
            nome: 'Alimentação',
            corPrimaria: '#57C278',
            corSecundaria: '#D9F7E9'
        },
        {
            nome: 'Moradia',
            corPrimaria: '#82CFFA',
            corSecundaria: '#E8F8FF'
        },
        {
            nome: 'Educação',
            corPrimaria: '#A6D157',
            corSecundaria: '#F0F8E2'
        },
        {
            nome: 'Animal de Estimação',
            corPrimaria: '#E06B69',
            corSecundaria: '#FDE7E8'
        },
        {
            nome: 'Saúde',
            corPrimaria: '#D86EBF',
            corSecundaria: '#FAE5F5'
        },
        {
            nome: 'Transporte',
            corPrimaria: '#FEBA05',
            corSecundaria: '#FFF5D9'
        },
        {
            nome: 'Pessoa',
            corPrimaria: '#FF8A29',
            corSecundaria: '#FFEEDF'
        },
        {
            nome: 'Lazer',
            corPrimaria: '#57C278',
            corSecundaria: '#D9F7E9'
        },
        {
            nome: 'Serviços Financeiros',
            corPrimaria: '#82CFFA',
            corSecundaria: '#E8F8FF'
        },
        {
            nome: 'Renda',
            corPrimaria: '#A6D157',
            corSecundaria: '#F0F8E2'
        },
        {
            nome: 'Renda Extra',
            corPrimaria: '#E06B69',
            corSecundaria: '#FDE7E8'
        }
    ];

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
        setGrupo('');
    }

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [grupo, setGrupo] = useState('');

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
            <ListaSuspensa
                valor={grupo}
                aoAlterado={valor => setGrupo(valor)}
                label="Grupo"
                itens={grupos.map(grupo => grupo.nome)}
            />
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioDespesa;