import { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Header from './componentes/Header/Header';
import FormularioDespesa from './componentes/FormularioDespesa/FormularioDespesa';
import Rodape from './componentes/Rodape/Rodape';
import Table from './componentes/Table/Table';

function App() {

    const colunas = [
        {
            titulo: 'Descrição'
        },
        {
            titulo: 'Grupo'
        },
        {
            titulo: 'Valor'
        },
        {
            titulo: 'Ações'
        }
    ];

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

    const [despesas, setDespesas] = useState([]);

    useEffect(() => {
        async function fetchDespesas() {
            const response = await fetch('http://localhost:8080/despesas');
            const despesasJson = await response.json();
            setDespesas(despesasJson);
        }
        fetchDespesas();
    }, []);

    const aoSalvar = (despesa) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(despesa)
        };

        fetch("http://localhost:8080/despesas", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDespesas([...despesas, data])
            });
    }

    const aoDeletar = (id) => {
        fetch(`http://localhost:8080/despesas/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setDespesas(despesas.filter(despesa => despesa._id !== id))
        })
        .catch(error => console.error(error))
    }

    return (
        <div className="App">
            <Header></Header>

            <FormularioDespesa
                aoSalvar={despesa => aoSalvar(despesa)}
                grupos={grupos.map(grupo => grupo.nome)}
            />

            <Table colunas={colunas}>
                {despesas.map(despesa => <tr key={despesa._id}><td>{despesa.descricao}</td><td>{despesa.grupo? despesa.grupo.nome : ''}</td><td>{despesa.valor}</td><td><AiFillCloseCircle size={25} onClick={() => aoDeletar(despesa._id)} /></td></tr>)}
            </Table>

            <Rodape />
        </div>
    );

}

export default App;
