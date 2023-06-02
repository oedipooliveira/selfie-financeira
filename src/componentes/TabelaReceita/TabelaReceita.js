import { AiFillCloseCircle, AiFillEdit, AiOutlineCarryOut } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../Formulario/Formulario';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';
import FormataFormaPagamento from '../../util/FormataFormaPagamento';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';

function TabelaReceita() {

    const navigate = useNavigate();
    const [receitas, setReceitas] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState('');

    const colunas = [
        { titulo: 'Descrição' },
        { titulo: 'Valor' },
        { titulo: 'Recebimento' },
        { titulo: 'Forma de recebimento' },
        { titulo: 'Ações' }
    ];

    useEffect(() => {
        async function fetchReceitas() {
            const requestOptions = {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            };
            if (periodo != null && periodo !== "") {
                const response = await fetch(`http://localhost:8080/receitas?periodo=${periodo}`, requestOptions);
                const receitasJson = await response.json();
                setReceitas(receitasJson);
            }
        }

        fetchReceitas();
    }, [periodo]);

    useEffect(() => {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        function populaListaPeriodos() {
            let mesAtual = (new Date()).getMonth() + 1;
            let anoAtual = (new Date()).getFullYear();
            let listaPeriodos = [];
            for (let i = 0; i < 5; i++) {
                while (mesAtual > 0) {
                    listaPeriodos.push({ mes: meses[mesAtual - 1], ano: anoAtual - i })
                    mesAtual--;
                }
                mesAtual = 12
            }
            setPeriodos(listaPeriodos);
        }

        populaListaPeriodos();
    }, []);

    useEffect(() => {
        if (periodos != null && periodos.length > 0) {
            setPeriodo(`${periodos[0].mes}/${periodos[0].ano}`);
        }
    }, [periodos]);

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

    const aoQuitar = (id) => {
        navigate(`/receita/form-quitacao/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/receita/form');
    }

    return (
        <div>
            <Formulario titulo="Receitas">
                <ListaSuspensa
                    valor={periodo}
                    aoAlterado={valor => setPeriodo(valor)}
                    obrigatorio={false}
                    label="Mês"
                    itens={periodos.map(p => ({key: `${p.mes}/${p.ano}`, value: `${p.mes}/${p.ano}`}))}
                />
            </Formulario>
            <Tabela colunas={colunas} titulo="Receitas" aoClicarEmNovo={aoClicarEmNovo}>
                {receitas.map(receita => (
                    <tr key={receita._id}>
                        <td>{receita.descricao}</td>
                        <td className='text-right'>{FormataValorReal(receita.valor)}</td>
                        <td className='text-center'>{FormataData(receita.recebimento)}</td>
                        <td className='text-center'>{FormataFormaPagamento(receita.formaRecebimento)}</td>
                        <td className='text-center'>
                            <AiFillCloseCircle className='buttonIcon' size={20} onClick={() => aoDeletar(receita._id)} />
                            <AiFillEdit className='buttonIcon' size={20} onClick={() => aoEditar(receita._id)} />
                            <AiOutlineCarryOut className='buttonIcon' size={20} onClick={() => aoQuitar(receita._id)} />
                        </td>
                    </tr>
                ))}
            </Tabela>
        </div>
    );
}

export default TabelaReceita;