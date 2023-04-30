import './Dashboard.css';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai';

function Dashboard() {

    const [totalDespesas, setTotalDespesas] = useState([]);
    const [totalReceitas, setTotalReceitas] = useState([]);
    const [resultado, setResultado] = useState([]);

    useEffect(() => {
        async function fetchTotalDespesas() {
            const response = await fetch('http://localhost:8080/despesas/total');
            const totalDespesasJson = await response.json();
            setTotalDespesas(totalDespesasJson.totalDespesas);
        }
        fetchTotalDespesas();
    }, []);

    useEffect(() => {
        async function fetchTotalReceitas() {
            const response = await fetch('http://localhost:8080/receitas/total');
            const totalReceitasJson = await response.json();
            setTotalReceitas(totalReceitasJson.totalReceitas);
        }
        fetchTotalReceitas();
    }, []);

    useEffect(() => {
        setResultado(totalReceitas - totalDespesas);
    }, [totalDespesas, totalReceitas]);

    return (
        <div className='dashboard'>
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
    );
}

export default Dashboard;