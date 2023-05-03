import './GraficoMeta.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function GraficoMeta() {

    const data = [
        {name: 'Reserva de emergência', vendas: 10},
        {name: 'Fazer o muro de casa', vendas: 25},
        {name: 'Lançamento de maio', vendas: 15},
    ];

    return (
        <div className='grafico'>
            <div className='titulo'>
                <span className='icone'>
                    <AiOutlinePlusCircle className='green' />
                </span>
                <span>Gráfico de Metas</span>
            </div>
            <BarChart width={600} height={300} data={data} layout="vertical">
                <XAxis domain={[0, 100]} type="number" />
                <YAxis type="category" dataKey="name" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#8884d8" layout="horizontal" />
            </BarChart>
        </div>
    );
}

export default GraficoMeta;