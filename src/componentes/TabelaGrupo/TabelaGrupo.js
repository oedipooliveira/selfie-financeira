import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../Tabela/Tabela';

function TabelaGrupo() {

    const navigate = useNavigate();
    const [grupos, setGrupos] = useState([]);

    const colunas = [
        { titulo: 'Nome' },
        { titulo: 'Ações' }
    ];

    useEffect(() => {
        async function fetchGrupos() {
            const response = await fetch('http://localhost:8080/grupos');
            const gruposJson = await response.json();
            setGrupos(gruposJson);
        }
        fetchGrupos();
    }, []);

    const aoDeletar = (id) => {
        fetch(`http://localhost:8080/grupos/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setGrupos(grupos.filter(grupo => grupo._id !== id))
        })
        .catch(error => console.error(error))
    }

    const aoEditar = (id) => {
        navigate(`/grupo/form/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/grupo/form');
    }

    return (
        <Tabela colunas={colunas} titulo="Grupos" aoClicarEmNovo={aoClicarEmNovo}>
            {grupos.map(grupo => (
                <tr key={grupo._id}>
                    <td>{grupo.nome}</td>
                    <td className='text-center'>
                        <AiFillCloseCircle className='buttonIcon' size={20} onClick={() => aoDeletar(grupo._id)} />
                        <AiFillEdit className='buttonIcon' size={20} onClick={() => aoEditar(grupo._id)} />
                    </td>
                </tr>
            ))}
        </Tabela>
    );

}

export default TabelaGrupo;