import { AiFillCloseCircle, AiFillEdit, AiOutlineCarryOut } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';
import FormataFormaPagamento from '../../util/FormataFormaPagamento';

function TabelaDespesa() {

    const navigate = useNavigate();
    const [despesas, setDespesas] = useState([]);

    const colunas = [
        { titulo: 'Descrição' },
        { titulo: 'Valor' },
        { titulo: 'Vencimento' },
        { titulo: 'Forma de pagamento' },
        { titulo: 'Ações' }
    ];

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

    const aoEditar = (id) => {
        navigate(`/despesa/form/${id}`);
    }

    const aoQuitar = (id) => {
        navigate(`/despesa/form-quitacao/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/despesa/form');
    }

    return (
        <Tabela colunas={colunas} titulo="Despesas" aoClicarEmNovo={aoClicarEmNovo}>
            {despesas.map(despesa => (
                <tr key={despesa._id}>
                    <td>{despesa.descricao}</td>
                    <td className='text-right'>{FormataValorReal(despesa.valor)}</td>
                    <td className='text-center'>{FormataData(despesa.vencimento)}</td>
                    <td className='text-center'>{FormataFormaPagamento(despesa.formaPagamento)}</td>
                    <td className='text-center'>
                        <AiFillCloseCircle className='buttonIcon' size={20} onClick={() => aoDeletar(despesa._id)} />
                        <AiFillEdit className='buttonIcon' size={20} onClick={() => aoEditar(despesa._id)} />
                        <AiOutlineCarryOut className='buttonIcon' size={20} onClick={() => aoQuitar(despesa._id)} />
                    </td>
                </tr>
            ))}
        </Tabela>
    );
}

export default TabelaDespesa;