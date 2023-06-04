import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { BsPiggyBankFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';

function TabelaMeta() {

    const navigate = useNavigate();
    const [metas, setMetas] = useState([]);

    const colunas = [
        { titulo: 'Eu preciso de' },
        { titulo: 'Até' },
        { titulo: 'Para' },
        { titulo: 'Porque' },
        { titulo: 'Valor guardado' },
        { titulo: 'Ações' }
    ];

    useEffect(() => {
        async function fetchMetas() {
            const requestOptions = {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            };
            const response = await fetch('http://localhost:8080/metas', requestOptions);
            const metasJson = await response.json();
            setMetas(metasJson);
        }
        fetchMetas();
    }, []);

    const aoDeletar = (id) => {
        fetch(`http://localhost:8080/metas/${id}`, {
            method: 'DELETE',
            "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        })
        .then(response => response.json())
        .then(data => {
            setMetas(metas.filter(meta => meta._id !== id))
        })
        .catch(error => console.error(error))
    }

    const aoEditar = (id) => {
        navigate(`/meta/form/${id}`);
    }

    const aoDepositar = (id) => {
        navigate(`/meta/form-deposito/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/meta/form');
    }

    return (
        <Tabela colunas={colunas} titulo="Metas" aoClicarEmNovo={aoClicarEmNovo}>
            {metas.map(meta => (
                <tr key={meta._id}>
                    <td className='text-right'>{FormataValorReal(meta.valor)}</td>
                    <td className='text-center'>{FormataData(meta.data)}</td>
                    <td>{meta.nome}</td>
                    <td>{meta.motivo}</td>
                    <td className='text-right'>{FormataValorReal(meta.valorGuardado)}</td>
                    <td className='text-center'>
                        <AiFillCloseCircle className='buttonIcon' size={20} onClick={() => aoDeletar(meta._id)} />
                        <AiFillEdit className='buttonIcon' size={20} onClick={() => aoEditar(meta._id)} />
                        <BsPiggyBankFill className='buttonIcon' size={20} onClick={() => aoDepositar(meta._id)} />
                    </td>
                </tr>
            ))}
        </Tabela>
    );

}

export default TabelaMeta;