import { AiTwotoneDelete } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';

function TabelaDespesa() {

    const navigate = useNavigate();

    const colunas = [
        { titulo: 'Descrição' },
        { titulo: 'Valor' },
        { titulo: 'Ações' }
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
        <Tabela colunas={colunas} titulo="Despesas" aoClicarEmNovo={aoClicarEmNovo}>
            {despesas.map(despesa => <tr key={despesa._id}><td>{despesa.descricao}</td><td className='text-right'>{FormataValorReal(despesa.valor)}</td><td className='text-center'><AiTwotoneDelete size={20} onClick={() => aoDeletar(despesa._id)} /></td></tr>)}
        </Tabela>
    );
}

export default TabelaDespesa;