import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';

function TabelaReceita() {

    const navigate = useNavigate();
    const [receitas, setReceitas] = useState([]);

    const colunas = [
        { titulo: 'Descrição' },
        { titulo: 'Valor' },
        { titulo: 'Recebimento' },
        { titulo: 'Ações' }
    ];

    useEffect(() => {
        async function fetchReceitas() {
            const response = await fetch('http://localhost:8080/receitas');
            const receitasJson = await response.json();
            setReceitas(receitasJson);
        }
        fetchReceitas();
    }, []);

    const aoDeletar = (id) => {
        fetch(`http://localhost:8080/receitas/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setReceitas(receitas.filter(receita => receita._id !== id))
        })
        .catch(error => console.error(error))
    }

    const aoEditar = (id) => {
        navigate(`/receita/form/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/receita/form');
    }

    return (
        <Tabela colunas={colunas} titulo="Receitas" aoClicarEmNovo={aoClicarEmNovo}>
            {receitas.map(receita => (
                <tr key={receita._id}>
                    <td>{receita.descricao}</td>
                    <td className='text-right'>{FormataValorReal(receita.valor)}</td>
                    <td className='text-center'>{FormataData(receita.recebimento)}</td>
                    <td className='text-center'>
                        <AiFillCloseCircle className='buttonIcon' size={20} onClick={() => aoDeletar(receita._id)} />
                        <AiFillEdit className='buttonIcon' size={20} onClick={() => aoEditar(receita._id)} />
                    </td>
                </tr>
            ))}
        </Tabela>
    );
}

export default TabelaReceita;