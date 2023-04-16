import { AiFillCloseCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Table/Table';

function TabelaDespesa() {

    const navigate = useNavigate();

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

    const [despesas, setDespesas] = useState([]);

    useEffect(() => {
        async function fetchDespesas() {
            const response = await fetch('http://localhost:8080/despesas');
            const despesasJson = await response.json();
            setDespesas(despesasJson);
        }
        fetchDespesas();
    }, []);

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

    const aoClicarEmNovo = () => {
        navigate('/despesa/form');
    }

    return (
        <Table colunas={colunas} titulo="Despesas" aoClicarEmNovo={aoClicarEmNovo}>
            {despesas.map(despesa => <tr key={despesa._id}><td>{despesa.descricao}</td><td>{despesa.grupo? despesa.grupo.nome : ''}</td><td>{despesa.valor}</td><td><AiFillCloseCircle size={25} onClick={() => aoDeletar(despesa._id)} /></td></tr>)}
        </Table>
    );
}

export default TabelaDespesa;