import './Dashboard.css';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import GraficoMeta from '../GraficoMeta/GraficoMeta';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import Formulario from '../Formulario/Formulario';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';

function Dashboard() {

    const [totalDespesas, setTotalDespesas] = useState([]);
    const [totalReceitas, setTotalReceitas] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState('');

    useEffect(() => {
        async function fetchTotalDespesas() {
            if (periodo != null && periodo !== "") {
                const response = await fetch(`http://localhost:8080/despesas/total?periodo=${periodo}`);
                const totalDespesasJson = await response.json();
                setTotalDespesas(totalDespesasJson.totalDespesas);
            }
        }
        fetchTotalDespesas();
    }, [periodo]);

    useEffect(() => {
        async function fetchTotalReceitas() {
            if (periodo != null && periodo !== "") {
                const response = await fetch(`http://localhost:8080/receitas/total?periodo=${periodo}`);
                const totalReceitasJson = await response.json();
                setTotalReceitas(totalReceitasJson.totalReceitas);
            }
        }
        fetchTotalReceitas();
    }, [periodo]);

    useEffect(() => {
        setResultado(totalReceitas - totalDespesas);
    }, [totalDespesas, totalReceitas]);

    useEffect(() => {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        function populaListaPeriodos() {
            let mesAtual = (new Date()).getMonth() + 2;
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

    return (
        <div className='dashboard'>
            <Formulario titulo="Dashboard">
                <ListaSuspensa
                    valor={periodo}
                    aoAlterado={valor => setPeriodo(valor)}
                    obrigatorio={false}
                    label="Mês"
                    itens={periodos.map(p => ({key: `${p.mes}/${p.ano}`, value: `${p.mes}/${p.ano}`}))}
                />
            </Formulario>
            <div className='flex'>
                <Card titulo='Despesas' cor='red' valor={totalDespesas}>
                    <AiOutlineMinusCircle className='red' />
                </Card>
                <Card titulo='Receitas' cor='green' valor={totalReceitas}>
                    <AiOutlinePlusCircle className='green' />
                </Card>
                <Card titulo='Resultado' cor='blue' valor={resultado}>
                    <AiOutlineCheckCircle className='blue' />
                </Card>
            </div>
            <GraficoMeta />
        </div>
    );
}

export default Dashboard;