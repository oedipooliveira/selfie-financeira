import { useState } from 'react';
import Header from './componentes/Header/Header';
import FormularioDespesa from './componentes/FormularioDespesa/FormularioDespesa';
import GrupoDespesa from './componentes/GrupoDespesa/GrupoDespesa';
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

    const aoSalvar = (despesa) => {
        setDespesas([...despesas, despesa])
    }

    const aoDeletar = () => {
        console.log('não é face');
    }

    return (
        <div className="App">
            <Header></Header>

            <FormularioDespesa
                aoSalvar={despesa => aoSalvar(despesa)}
                grupos={grupos.map(grupo => grupo.nome)}
            />

            <Table colunas={colunas}>
                {despesas.map(despesa => <tr><td>{despesa.descricao}</td><td>{despesa.grupo}</td><td>{despesa.valor}</td></tr>)}
            </Table>

            <Rodape />
        </div>
    );

}

export default App;
