import { AiFillCloseCircle, AiFillEdit, AiOutlineCarryOut } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TabelaDespesa.css';
import Formulario from '../Formulario/Formulario';
import Tabela from '../Tabela/Tabela';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';
import FormataFormaPagamento from '../../util/FormataFormaPagamento';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';

function TabelaDespesa() {

    const navigate = useNavigate();
    const [despesas, setDespesas] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState('');

    const colunas = [
        { titulo: 'Descrição' },
        { titulo: 'Valor' },
        { titulo: 'Vencimento' },
        { titulo: 'Forma de pagamento' },
        { titulo: 'Ações' }
    ];

    useEffect(() => {
        async function fetchDespesas() {
            if (periodo != null && periodo !== "") {
                const response = await fetch('http://localhost:8080/despesas');
                const despesasJson = await response.json();
                setDespesas(ordenaDespesasPorGrupo(despesasJson));
                setGrupos(carregaGruposByDespesas(despesasJson));
            }
        }

        fetchDespesas();
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

    const ordenaDespesasPorGrupo = (despesas) => {
        return despesas.sort((a, b) => {
            const grupoA = a.grupo.nome.toUpperCase();
            const grupoB = b.grupo.nome.toUpperCase();
            if (grupoA < grupoB) { return -1; }
            if (grupoA > grupoB) { return 1; }
            return 0;
        });
    }

    const carregaGruposByDespesas = (despesas) => {
        let listaGrupo = [];
        if (despesas != null && despesas.length > 0) {
            for (let i = 0; i < despesas.length; i++) {
                let grupo = despesas[i].grupo.nome;
                if (!listaGrupo.includes(grupo)) {
                    listaGrupo.push(grupo);
                }
            }
        }
        return listaGrupo;
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

    const aoEditar = (id) => {
        navigate(`/despesa/form/${id}`);
    }

    const aoQuitar = (id) => {
        navigate(`/despesa/form-quitacao/${id}`);
    }

    const aoClicarEmNovo = () => {
        navigate('/despesa/form');
    }

    const carregaLinhasTabelaDespesa = () => {
        let linhas = [];
        for (let i = 0; i < grupos.length; i++) {
            let grupo = grupos[i];
            linhas.push(
                <tr className='linha-grupo' key={grupo}>
                    <td colSpan={colunas.length}>{grupo}</td>
                </tr>
            );
            for (let j = 0; j < despesas.length; j++) {
                let despesa = despesas[j];
                if (grupo === despesa.grupo.nome) {
                    linhas.push(
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
                    );
                }
            }
        }
        return linhas;
    }

    return (
        <div>
            <Formulario titulo="Despesas">
                <ListaSuspensa
                    valor={periodo}
                    aoAlterado={valor => setPeriodo(valor)}
                    obrigatorio={false}
                    label="Mês"
                    itens={periodos.map(p => ({key: `${p.mes}/${p.ano}`, value: `${p.mes}/${p.ano}`}))}
                />
            </Formulario>
            <Tabela colunas={colunas} titulo="Despesas" aoClicarEmNovo={aoClicarEmNovo}>
                {carregaLinhasTabelaDespesa()}
            </Tabela>
        </div>
    );
}

export default TabelaDespesa;